// all the formulas are from here https://www.eloratings.net/about

const RFPL_T_RATING = 10;

const K = (diff: number, t_rating: number = RFPL_T_RATING) => {
  const k = t_rating;
  switch (Math.abs(diff)) {
    case 0 | 1:
      return k;
    case 2:
      return (1 + 0.5) * k;
    case 3:
      return (1 + 0.75) * k;
    default:
      return (1 + 0.75 + (diff - 3) / 8) * k;
  }
};

const W = (diff: number) => {
  if (diff > 0) return 1;
  else if (diff == 0) return 0.5;
  else return 0;
};

const We = (dr: number, at_home: boolean, home_coef = 50) => {
  if (at_home) dr += home_coef;

  return 1.0 / (10 ** (-dr / 400.0) + 1);
};

const calculateNewRating = (
  old_rating: number,
  other_rating: number,
  at_home: boolean,
  goal_diff: number,
  t_rating: number = RFPL_T_RATING,
  home_coef = 50
): number => {
  return Math.ceil(
    old_rating +
      K(goal_diff, t_rating) *
        (W(goal_diff) - We(old_rating - other_rating, at_home, home_coef))
  );
};

export default calculateNewRating;
