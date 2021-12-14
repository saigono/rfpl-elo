import { Cell, Column, HeaderCell, SortType, Table } from "rsuite-table";
import { ResponsiveLine, Serie } from "@nivo/line";

import "rsuite-table/dist/css/rsuite-table.css";
import "rsuite/dist/rsuite.css";
import { useEffect, useState } from "react";
import {
  Checkbox,
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Header,
  InputNumber,
  Panel,
  SelectPicker,
} from "rsuite";

import { buildData, MatchData, Team } from "./data-builder";
import calculateNewRating from "./elo";

const MAX_TEAMS = 16;
const DEFAULT_RATING = 1200;

interface Props {
  season?: string;
}

type RatingTable = Map<Team, number>;
type PointsTable = Map<Team, number>;
type Position = number;

type RatingHistory = {
  rating: number;
  date: Date;
}[];

type Season = {
  teams: Set<Team>;
  matches: MatchData[];
  ratings: RatingTable;
  points: PointsTable;
};

type SeasonResult = {
  name: Team;
  points: number;
  rating: number;
  eloPosition: Position;
  pointsPosition: Position;
  positionsDiff: Position;
};

type SeasonResultFieldValue = Team | number;

const splitBySeason = (matches: MatchData[]): Map<string, MatchData[]> => {
  const seasons = new Map<string, MatchData[]>();
  for (const match of matches) {
    if (!seasons.has(match.season)) {
      seasons.set(match.season, []);
    }
    seasons.get(match.season)?.push(match);
  }
  return seasons;
};

const pointsForMatch = (a: number, b: number) => (a > b ? 3 : a < b ? 0 : 1);

const emulateSeason = (
  matches: MatchData[],
  ratings: RatingTable,
  defaultRating: number = DEFAULT_RATING
): Season => {
  const newRatings: RatingTable = new Map();
  const realPoints: PointsTable = new Map();

  const teams = new Set<Team>();
  for (const match of matches) {
    teams.add(match.home);
    teams.add(match.away);
    if (teams.size == MAX_TEAMS) {
      break;
    }
  }
  ratings.forEach((rating, team) => {
    if (teams.has(team)) {
      newRatings.set(team, rating);
    }
  });

  for (const match of matches) {
    if (!teams.has(match.home) || !teams.has(match.away)) {
      break;
    }
    const homeRating = newRatings.get(match.home) || defaultRating;
    const awayRating = newRatings.get(match.away) || defaultRating;

    const newHomeRating = calculateNewRating(
      homeRating,
      awayRating,
      true,
      match.score.home - match.score.away
    );
    const newAwayRating = calculateNewRating(
      awayRating,
      homeRating,
      false,
      match.score.away - match.score.home
    );

    newRatings.set(match.home, newHomeRating);
    newRatings.set(match.away, newAwayRating);

    const homePoints = realPoints.get(match.home) || 0;
    const awayPoints = realPoints.get(match.away) || 0;

    realPoints.set(
      match.home,
      homePoints + pointsForMatch(match.score.home, match.score.away)
    );
    realPoints.set(
      match.away,
      awayPoints + pointsForMatch(match.score.away, match.score.home)
    );
  }
  return {
    teams,
    matches,
    ratings: newRatings,
    points: realPoints,
  };
};

const listSeasonResults = (season: Season): SeasonResult[] => {
  const results: SeasonResult[] = [];
  type TNType = [Team, number];
  const eloPositions: TNType[] = [];
  const pointPositions: TNType[] = [];
  season.ratings.forEach((v, k) => {
    eloPositions.push([k, v]);
  });
  season.points.forEach((v, k) => {
    pointPositions.push([k, v]);
  });
  const compareFn = (a: TNType, b: TNType) =>
    a[1] > b[1] ? 1 : a[1] === b[1] ? 0 : -1;
  eloPositions.sort(compareFn).reverse();
  pointPositions.sort(compareFn).reverse();

  const eloStandings = new Map<Team, Position>();
  const pointStandings = new Map<Team, Position>();

  eloStandings.set(eloPositions[0][0], 1);
  pointStandings.set(pointPositions[0][0], 1);
  for (let i = 1; i < MAX_TEAMS; i++) {
    if (eloPositions[i][1] === eloPositions[i - 1][1]) {
      eloStandings.set(
        eloPositions[i][0],
        eloStandings.get(eloPositions[i - 1][0]) as Position
      );
    } else {
      eloStandings.set(eloPositions[i][0], i + 1);
    }

    if (pointPositions[i][1] === pointPositions[i - 1][1]) {
      pointStandings.set(
        pointPositions[i][0],
        pointStandings.get(pointPositions[i - 1][0]) as Position
      );
    } else {
      pointStandings.set(pointPositions[i][0], i + 1);
    }
  }

  season.teams.forEach((team) => {
    const pointsPosition = pointStandings.get(team) || 0;
    const eloPosition = eloStandings.get(team) || 0;
    const positionsDiff = eloPosition - pointsPosition;
    results.push({
      name: team,
      points: season.points.get(team) || 0,
      rating: season.ratings.get(team) || 0,
      pointsPosition,
      eloPosition,
      positionsDiff,
    });
  });
  return results;
};

const keyToFieldValue = (
  result: SeasonResult,
  key: string
): SeasonResultFieldValue => {
  switch (key) {
    case "name":
      return result.name;
    case "points":
      return result.points;
    case "rating":
      return result.rating;
    case "pointsPosition":
      return result.pointsPosition;
    case "eloPosition":
      return result.eloPosition;
    case "positionsDiff":
      return result.positionsDiff;
    default:
      return "";
  }
};

const buildResults = (
  useHistoricalRatings: boolean,
  seasonsLabels: string[],
  seasonLabel: string,
  seasonsData: Map<string, MatchData[]>,
  defaultRating: number = DEFAULT_RATING
): SeasonResult[] => {
  let results: SeasonResult[] = [];
  if (useHistoricalRatings) {
    let globalRatings = new Map<Team, number>();
    let worstRating = defaultRating;
    for (let i = 0; i < seasonsLabels.length; i++) {
      const season = emulateSeason(
        seasonsData.get(seasonsLabels[i]) as MatchData[],
        globalRatings,
        Math.max(worstRating, defaultRating)
      );
      globalRatings = season.ratings;
      results = listSeasonResults(season);
      if (seasonsLabels[i] === seasonLabel) {
        break;
      }
      for (const res of results) {
        if (res.eloPosition === 15) {
          worstRating = res.rating;
          globalRatings.delete(res.name);
        } else if (res.eloPosition === 16) {
          globalRatings.delete(res.name);
        }
      }
    }
  } else {
    const season = emulateSeason(
      seasonsData.get(seasonLabel) as MatchData[],
      new Map<Team, number>()
    );
    results = listSeasonResults(season);
  }
  return results;
};

const Rating = (props: Props) => {
  const [results, setResults] = useState([] as SeasonResult[]);
  const [seasonsLabels, setSeasonsLabels] = useState([] as string[]);
  const [seasonsData, setSeasonsData] = useState(
    new Map<string, MatchData[]>()
  );
  const [seasonLabel, setSeasonLabel] = useState("2012/2013");
  const [useHistoricalRatings, setUseHistoricalRatings] = useState(false);
  const [defaultRating, setDefaultRating] = useState(DEFAULT_RATING);

  useEffect(() => {
    const data = buildData();
    setSeasonsData(splitBySeason(data));
  }, []);

  useEffect(() => {
    setSeasonsLabels(Array.from(seasonsData.keys()).sort());
  }, [seasonsData]);

  const defaultSortColumn = "pointsPosition";
  const [sortColumn, setSortColumn] = useState(defaultSortColumn);
  const [sortType, setSortType] = useState("asc" as SortType);

  useEffect(() => {
    if (seasonsData.size > 0) {
      const _results = buildResults(
        useHistoricalRatings,
        seasonsLabels,
        seasonLabel,
        seasonsData,
        defaultRating
      );
      const sign = sortType === "asc" ? 1 : -1;
      _results?.sort((a, b) =>
        keyToFieldValue(a, sortColumn) > keyToFieldValue(b, sortColumn)
          ? sign
          : keyToFieldValue(a, sortColumn) === keyToFieldValue(b, sortColumn)
          ? 0
          : -sign
      );
      setResults(_results);
    }
  }, [
    useHistoricalRatings,
    seasonsLabels,
    seasonLabel,
    seasonsData,
    defaultRating,
  ]);

  return (
    <>
      <Container>
        <Header>
          <h4>Российская Премьер Лига: Рейтинг Эло </h4>
        </Header>
        <Content>
          <FlexboxGrid justify="center">
            <Panel shaded style={{ width: 400 }}>
              <FlexboxGrid justify="start" align="middle">
                <FlexboxGrid.Item>Сезон: </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <SelectPicker
                    data={seasonsLabels.map((l) => ({
                      label: l,
                      value: l,
                    }))}
                    size="sm"
                    onSelect={(value) => {
                      setSeasonLabel(value);
                    }}
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
              <FlexboxGrid justify="start" align="middle">
                <FlexboxGrid.Item>Исторические данные: </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <Checkbox
                    defaultChecked={useHistoricalRatings}
                    onChange={(_, checked) => {
                      setUseHistoricalRatings(checked);
                    }}
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
              <FlexboxGrid justify="start" align="middle">
                <FlexboxGrid.Item>Эло по-умолчанию:</FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <InputNumber
                    min={800}
                    max={1600}
                    value={defaultRating}
                    onChange={(value) => {
                      setDefaultRating(parseInt(value.toString(), 10));
                    }}
                    size="sm"
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Panel>
          </FlexboxGrid>
          <Divider />
          <FlexboxGrid justify="center">
            <Table
              data={results}
              sortColumn={sortColumn}
              sortType={sortType}
              onSortColumn={(key, type) => {
                setSortColumn(key);
                setSortType(type as SortType);
                const sign = type === "asc" ? 1 : -1;
                setResults(
                  results.sort((a, b) =>
                    keyToFieldValue(a, key) > keyToFieldValue(b, key)
                      ? sign
                      : keyToFieldValue(a, key) === keyToFieldValue(b, key)
                      ? 0
                      : -sign
                  )
                );
              }}
              width={950}
              autoHeight={true}
            >
              <Column width={150} sortable resizable>
                <HeaderCell>Points Position</HeaderCell>
                <Cell dataKey="pointsPosition" />
              </Column>

              <Column width={150} sortable resizable>
                <HeaderCell>Elo Position</HeaderCell>
                <Cell dataKey="eloPosition" />
              </Column>

              <Column width={250} sortable resizable>
                <HeaderCell>Position Difference</HeaderCell>
                <Cell dataKey="positionsDiff">
                  {(rowData) => {
                    return rowData.positionsDiff > 0
                      ? `+${rowData.positionsDiff}`
                      : rowData.positionsDiff;
                  }}
                </Cell>
              </Column>
              <Column width={200} sortable fixed resizable>
                <HeaderCell>Team</HeaderCell>
                <Cell dataKey="name" />
              </Column>

              <Column width={100} resizable>
                <HeaderCell>Points</HeaderCell>
                <Cell dataKey="points" />
              </Column>

              <Column width={100} resizable>
                <HeaderCell>Elo</HeaderCell>
                <Cell dataKey="rating" />
              </Column>
            </Table>
          </FlexboxGrid>
        </Content>
      </Container>
    </>
  );
};

export default Rating;
