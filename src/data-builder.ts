import { parse } from "csv-parse/lib/sync";

const csvData = `
Country,League,Season,Date,Time,Home,Away,HG,AG,Res,PH,PD,PA,MaxH,MaxD,MaxA,AvgH,AvgD,AvgA
Russia,Premier League,2012/2013,20/07/2012,16:00,M. Saransk,Lokomotiv Moscow,2,3,A,5.12,3.73,1.8,5.25,3.73,1.85,4.54,3.44,1.75
Russia,Premier League,2012/2013,21/07/2012,10:30,CSKA Moscow,FK Rostov,1,0,H,1.4,4.84,9.84,1.4,4.84,11.09,1.34,4.44,8.88
Russia,Premier League,2012/2013,21/07/2012,13:30,Volga N. Novgorod,Dynamo Moscow,1,0,H,4.55,3.58,1.9,4.62,3.6,2,3.96,3.35,1.88
Russia,Premier League,2012/2013,21/07/2012,17:00,Vladikavkaz,Spartak Moscow,1,2,A,4.12,3.54,2.02,4.12,3.54,2.04,3.78,3.28,1.95
Russia,Premier League,2012/2013,22/07/2012,12:00,Zenit,Amkar,2,0,H,1.28,5.65,15.42,1.29,5.73,16.04,1.26,5.11,11.62
Russia,Premier League,2012/2013,22/07/2012,14:30,FK Krylya Sovetov Samara,Akhmat Grozny,1,1,D,2.45,3.16,3.32,2.49,3.16,3.4,2.36,3.04,3.04
Russia,Premier League,2012/2013,22/07/2012,17:00,FK Anzi Makhackala,Kuban,2,1,H,1.65,3.75,6.01,1.65,3.85,7.95,1.54,3.63,6.43
Russia,Premier League,2012/2013,23/07/2012,16:30,Krasnodar,Rubin Kazan,2,1,H,4.15,3.47,2.04,4.17,3.47,2.06,3.75,3.25,1.96
Russia,Premier League,2012/2013,27/07/2012,17:00,Kuban,M. Saransk,1,0,H,1.76,3.67,5.54,1.77,3.67,5.8,1.66,3.47,5.15
Russia,Premier League,2012/2013,28/07/2012,10:30,Zenit,Dynamo Moscow,2,0,H,1.68,3.84,5.85,1.68,3.84,6,1.61,3.58,5.44
Russia,Premier League,2012/2013,28/07/2012,13:30,Amkar,CSKA Moscow,3,1,H,5.09,3.23,1.93,5.5,3.45,1.95,4.53,3.24,1.81
Russia,Premier League,2012/2013,28/07/2012,16:00,Lokomotiv Moscow,FK Krylya Sovetov Samara,2,0,H,1.47,4.33,9.33,1.5,4.33,9.33,1.43,3.93,7.33
Russia,Premier League,2012/2013,29/07/2012,12:00,Rubin Kazan,Vladikavkaz,3,1,H,1.39,4.75,10.64,1.4,4.76,10.9,1.36,4.33,8.67
Russia,Premier League,2012/2013,29/07/2012,14:30,Spartak Moscow,Volga N. Novgorod,2,1,H,1.33,5.18,12.08,1.38,5.18,12.08,1.33,4.6,9.02
Russia,Premier League,2012/2013,29/07/2012,17:00,FK Rostov,FK Anzi Makhackala,2,2,D,4.11,3.43,2.04,4.11,3.45,2.06,3.67,3.24,1.98
Russia,Premier League,2012/2013,30/07/2012,16:00,Akhmat Grozny,Krasnodar,1,0,H,2.42,3.32,3.25,2.5,3.33,3.26,2.34,3.09,3
Russia,Premier League,2012/2013,03/08/2012,16:00,M. Saransk,FK Rostov,3,0,H,2.62,3.32,2.95,2.7,3.32,2.95,2.52,3.07,2.77
Russia,Premier League,2012/2013,04/08/2012,10:30,CSKA Moscow,Zenit,1,3,A,3.22,3.34,2.44,3.33,3.41,2.44,3.11,3.15,2.24
Russia,Premier League,2012/2013,04/08/2012,14:30,Vladikavkaz,Akhmat Grozny,5,0,H,2.52,3.14,3.25,2.52,3.25,3.35,2.35,3.07,3.02
Russia,Premier League,2012/2013,04/08/2012,17:00,Krasnodar,Lokomotiv Moscow,3,1,H,3.4,3.33,2.34,3.54,3.35,2.34,3.23,3.16,2.19
Russia,Premier League,2012/2013,05/08/2012,14:00,FK Krylya Sovetov Samara,Kuban,2,1,H,3.24,3.03,2.62,3.24,3.1,2.62,3.01,2.98,2.41
Russia,Premier League,2012/2013,05/08/2012,16:00,FK Anzi Makhackala,Amkar,1,0,H,1.51,4,9.5,1.51,4.3,9.5,1.44,3.97,7.46
Russia,Premier League,2012/2013,05/08/2012,18:00,Dynamo Moscow,Spartak Moscow,0,4,A,2.92,3.35,2.64,3.25,3.35,2.64,2.87,3.16,2.39
Russia,Premier League,2012/2013,06/08/2012,15:00,Volga N. Novgorod,Rubin Kazan,1,2,A,4.8,3.4,1.93,5,3.4,2,4.16,3.23,1.89
Russia,Premier League,2012/2013,10/08/2012,17:00,Kuban,Krasnodar,2,1,H,2.6,3.11,3.19,2.6,3.2,3.31,2.38,3.04,3
Russia,Premier League,2012/2013,11/08/2012,10:30,Zenit,Spartak Moscow,5,0,H,1.97,3.45,4.46,2,3.45,4.5,1.91,3.28,3.92
Russia,Premier League,2012/2013,11/08/2012,14:00,Lokomotiv Moscow,Vladikavkaz,2,2,D,1.42,4.92,8.98,1.42,4.92,9.5,1.37,4.34,8.29
Russia,Premier League,2012/2013,11/08/2012,16:30,Akhmat Grozny,Volga N. Novgorod,2,0,H,2.02,3.4,4.33,2.04,3.4,4.33,1.95,3.26,3.81
Russia,Premier League,2012/2013,12/08/2012,12:00,Amkar,M. Saransk,0,0,D,1.95,3.42,4.59,1.95,3.42,4.8,1.81,3.29,4.4
Russia,Premier League,2012/2013,12/08/2012,14:00,CSKA Moscow,FK Anzi Makhackala,1,0,H,2.6,3.2,3.08,2.6,3.25,3.35,2.32,3.12,3.02
Russia,Premier League,2012/2013,12/08/2012,16:00,Rubin Kazan,Dynamo Moscow,2,0,H,1.87,3.59,4.84,1.9,3.59,4.9,1.83,3.31,4.31
Russia,Premier League,2012/2013,12/08/2012,18:00,FK Rostov,FK Krylya Sovetov Samara,1,2,A,2.08,3.36,4.13,2.08,3.4,4.19,1.99,3.19,3.71
Russia,Premier League,2012/2013,18/08/2012,10:30,Spartak Moscow,Rubin Kazan,2,1,H,2.54,3.18,3.14,2.54,3.25,3.25,2.35,3.08,2.99
Russia,Premier League,2012/2013,18/08/2012,14:30,Volga N. Novgorod,Lokomotiv Moscow,0,2,A,4.61,3.46,1.93,4.61,3.46,2.1,3.86,3.27,1.93
Russia,Premier League,2012/2013,18/08/2012,17:00,Krasnodar,FK Rostov,0,0,D,,,,1.85,3.73,5.09,1.74,3.46,4.46
Russia,Premier League,2012/2013,19/08/2012,13:00,Dynamo Moscow,Akhmat Grozny,1,2,A,1.49,4.29,8.27,1.6,4.29,8.27,1.51,3.84,6.39
Russia,Premier League,2012/2013,19/08/2012,15:30,M. Saransk,CSKA Moscow,0,3,A,6.23,3.78,1.67,6.23,3.9,1.75,5.05,3.54,1.66
Russia,Premier League,2012/2013,19/08/2012,18:00,FK Anzi Makhackala,Zenit,1,1,D,3.03,3.19,2.62,3.2,3.25,2.62,2.94,3.1,2.38
Russia,Premier League,2012/2013,20/08/2012,15:00,FK Krylya Sovetov Samara,Amkar,0,2,A,2.34,3.1,3.62,2.36,3.25,3.65,2.2,3.1,3.28
Russia,Premier League,2012/2013,20/08/2012,17:00,Vladikavkaz,Kuban,2,1,H,2.52,3.19,3.19,2.52,3.29,3.3,2.33,3.12,2.99
Russia,Premier League,2012/2013,25/08/2012,10:30,Lokomotiv Moscow,Dynamo Moscow,2,3,A,1.78,3.86,4.86,1.85,3.86,5.14,1.75,3.49,4.53
Russia,Premier League,2012/2013,25/08/2012,13:00,Zenit,Rubin Kazan,1,2,A,1.93,3.56,4.44,1.95,3.7,4.91,1.81,3.37,4.34
Russia,Premier League,2012/2013,25/08/2012,15:30,Akhmat Grozny,Spartak Moscow,2,1,H,3.59,3.33,2.24,3.9,3.39,2.25,3.31,3.17,2.16
Russia,Premier League,2012/2013,25/08/2012,17:45,FK Rostov,Vladikavkaz,3,1,H,2.61,3.11,3.11,2.64,3.2,3.25,2.42,3.06,2.95
Russia,Premier League,2012/2013,26/08/2012,11:00,Amkar,Krasnodar,2,2,D,2.69,3.06,3.07,2.86,3.1,3.07,2.61,2.97,2.77
Russia,Premier League,2012/2013,26/08/2012,13:30,CSKA Moscow,FK Krylya Sovetov Samara,3,0,H,1.38,4.92,11.06,1.38,5,11.5,1.34,4.53,8.73
Russia,Premier League,2012/2013,26/08/2012,16:00,FK Anzi Makhackala,M. Saransk,4,2,H,1.38,4.87,10.3,1.42,5.2,11,1.36,4.44,8.41
Russia,Premier League,2012/2013,27/08/2012,16:30,Kuban,Volga N. Novgorod,6,2,H,1.62,3.88,6.69,1.64,4,7,1.57,3.61,5.96
Russia,Premier League,2012/2013,31/08/2012,16:00,M. Saransk,Zenit,0,3,A,10.23,5.36,1.35,13,5.8,1.36,9.43,4.92,1.3
Russia,Premier League,2012/2013,01/09/2012,11:00,Rubin Kazan,Akhmat Grozny,1,2,A,1.38,4.93,10.08,1.45,4.93,10.08,1.37,4.37,8.17
Russia,Premier League,2012/2013,01/09/2012,13:30,Volga N. Novgorod,FK Rostov,1,1,D,2.94,3.15,2.72,2.94,3.18,2.78,2.71,3.05,2.59
Russia,Premier League,2012/2013,01/09/2012,16:00,Vladikavkaz,Amkar,1,1,D,2.11,3.35,3.71,2.29,3.35,4,2.14,3.18,3.36
Russia,Premier League,2012/2013,02/09/2012,10:30,Krasnodar,CSKA Moscow,0,1,A,4.21,3.42,2.02,4.55,3.42,2.17,3.93,3.21,1.95
Russia,Premier League,2012/2013,02/09/2012,13:00,Dynamo Moscow,Kuban,1,2,A,1.91,3.47,4.73,1.95,3.57,4.95,1.85,3.29,4.26
Russia,Premier League,2012/2013,02/09/2012,15:15,FK Krylya Sovetov Samara,FK Anzi Makhackala,1,2,A,5.33,3.61,1.78,5.9,3.75,1.85,4.63,3.35,1.76
Russia,Premier League,2012/2013,02/09/2012,17:30,Lokomotiv Moscow,Spartak Moscow,2,1,H,2.68,3.36,2.82,2.85,3.44,2.82,2.53,3.24,2.64
Russia,Premier League,2012/2013,14/09/2012,17:00,Zenit,Akhmat Grozny,0,2,A,1.33,5.61,10.51,1.35,5.8,12,1.31,4.85,9.3
Russia,Premier League,2012/2013,15/09/2012,10:30,Lokomotiv Moscow,Rubin Kazan,1,0,H,2.64,3.34,2.88,2.7,3.34,3,2.51,3.07,2.8
Russia,Premier League,2012/2013,15/09/2012,14:00,Kuban,Spartak Moscow,2,2,D,2.89,3.34,2.64,3,3.34,2.65,2.82,3.1,2.46
Russia,Premier League,2012/2013,16/09/2012,12:00,CSKA Moscow,Vladikavkaz,2,0,H,1.37,5.05,10.34,1.4,5.25,10.34,1.36,4.52,8.12
Russia,Premier League,2012/2013,16/09/2012,14:30,FK Anzi Makhackala,Krasnodar,5,2,H,1.55,4.17,7.1,1.58,4.59,8.3,1.47,4,6.66
Russia,Premier League,2012/2013,16/09/2012,17:00,FK Rostov,Dynamo Moscow,1,0,H,3.27,3.36,2.37,3.5,3.36,2.4,3.09,3.14,2.27
Russia,Premier League,2012/2013,17/09/2012,14:00,Amkar,Volga N. Novgorod,3,2,H,1.68,3.65,6.29,1.85,3.8,6.29,1.7,3.43,4.89
Russia,Premier League,2012/2013,17/09/2012,16:30,M. Saransk,FK Krylya Sovetov Samara,2,3,A,2.27,3.39,3.43,2.38,3.39,3.45,2.24,3.14,3.18
Russia,Premier League,2012/2013,21/09/2012,16:00,Krasnodar,M. Saransk,6,1,H,1.64,4.05,5.92,1.75,4.05,6.1,1.64,3.62,5.01
Russia,Premier League,2012/2013,22/09/2012,10:30,Volga N. Novgorod,CSKA Moscow,2,3,A,8.19,4.55,1.45,8.19,4.55,1.57,6.68,3.96,1.48
Russia,Premier League,2012/2013,22/09/2012,12:45,Dynamo Moscow,Amkar,3,2,H,1.78,3.72,5.12,1.83,3.72,5.7,1.74,3.42,4.68
Russia,Premier League,2012/2013,22/09/2012,15:00,FK Krylya Sovetov Samara,Zenit,2,2,D,9.3,5.01,1.38,11,5.09,1.5,7.83,4.36,1.39
Russia,Premier League,2012/2013,22/09/2012,17:15,Akhmat Grozny,Lokomotiv Moscow,0,3,A,2.5,3.31,3.11,2.54,3.5,3.11,2.45,3.15,2.8
Russia,Premier League,2012/2013,23/09/2012,12:00,Spartak Moscow,FK Rostov,3,1,H,1.52,4.54,6.78,1.54,4.7,8.1,1.49,3.98,6.33
Russia,Premier League,2012/2013,23/09/2012,16:00,Rubin Kazan,Kuban,1,0,H,1.6,3.95,6.74,1.7,3.95,6.74,1.62,3.56,5.43
Russia,Premier League,2012/2013,24/09/2012,16:00,Vladikavkaz,FK Anzi Makhackala,0,1,A,5.28,3.94,1.72,5.7,4.09,1.75,4.79,3.58,1.69
Russia,Premier League,2012/2013,29/09/2012,11:00,Zenit,Lokomotiv Moscow,1,1,D,1.94,3.5,4.13,1.94,3.7,5,1.79,3.41,4.4
Russia,Premier League,2012/2013,29/09/2012,13:30,Amkar,Spartak Moscow,1,3,A,4.11,3.56,2,4.59,3.6,2,3.86,3.33,1.92
Russia,Premier League,2012/2013,29/09/2012,16:00,Kuban,Akhmat Grozny,2,1,H,2.08,3.44,3.94,2.22,3.5,3.94,2.06,3.23,3.48
Russia,Premier League,2012/2013,30/09/2012,10:30,CSKA Moscow,Dynamo Moscow,0,2,A,1.76,3.85,5.01,1.78,3.85,5.5,1.67,3.57,5.01
Russia,Premier League,2012/2013,30/09/2012,13:00,FK Anzi Makhackala,Volga N. Novgorod,2,1,H,1.22,6.78,16.85,1.29,6.9,18,1.21,5.97,12.55
Russia,Premier League,2012/2013,30/09/2012,15:30,FK Rostov,Rubin Kazan,0,4,A,4.25,3.49,1.99,4.84,3.49,2.12,3.92,3.25,1.95
Russia,Premier League,2012/2013,01/10/2012,14:30,FK Krylya Sovetov Samara,Krasnodar,2,2,D,2.84,3.34,2.66,2.84,3.34,2.8,2.59,3.16,2.65
Russia,Premier League,2012/2013,01/10/2012,17:00,M. Saransk,Vladikavkaz,1,1,D,2.38,3.51,3.11,2.44,3.51,3.2,2.27,3.31,2.95
Russia,Premier League,2012/2013,05/10/2012,16:00,Akhmat Grozny,FK Rostov,2,1,H,1.63,3.81,6.65,1.7,4.09,6.9,1.61,3.61,5.5
Russia,Premier League,2012/2013,06/10/2012,11:00,Lokomotiv Moscow,Kuban,0,1,A,1.72,3.94,5.22,1.72,3.95,5.75,1.62,3.65,5.26
Russia,Premier League,2012/2013,06/10/2012,13:30,Volga N. Novgorod,M. Saransk,0,2,A,2.11,3.55,3.7,2.15,3.55,4.09,2.06,3.26,3.47
Russia,Premier League,2012/2013,06/10/2012,16:00,Vladikavkaz,FK Krylya Sovetov Samara,2,2,D,2.48,3.19,3.23,2.48,3.4,3.3,2.3,3.18,3.02
Russia,Premier League,2012/2013,07/10/2012,10:30,Dynamo Moscow,FK Anzi Makhackala,0,2,A,2.97,3.4,2.54,3.05,3.4,2.57,2.82,3.19,2.42
Russia,Premier League,2012/2013,07/10/2012,12:45,Rubin Kazan,Amkar,0,1,A,1.35,4.96,11.83,1.45,4.96,11.83,1.35,4.4,9.07
Russia,Premier League,2012/2013,07/10/2012,15:00,Spartak Moscow,CSKA Moscow,0,2,A,2.83,3.37,2.66,2.87,3.4,2.84,2.65,3.16,2.58
Russia,Premier League,2012/2013,07/10/2012,17:15,Krasnodar,Zenit,0,2,A,5.63,3.91,1.69,6.1,4.15,1.7,5.15,3.78,1.61
Russia,Premier League,2012/2013,20/10/2012,10:30,FK Anzi Makhackala,Spartak Moscow,2,1,H,1.91,3.74,4.23,2.15,3.8,4.84,1.89,3.42,3.86
Russia,Premier League,2012/2013,20/10/2012,13:00,Zenit,Kuban,1,0,H,1.4,4.82,9.44,1.45,4.82,9.44,1.4,4.3,7.36
Russia,Premier League,2012/2013,20/10/2012,15:30,Krasnodar,Vladikavkaz,2,0,H,1.79,3.85,4.84,1.85,3.85,4.84,1.76,3.5,4.37
Russia,Premier League,2012/2013,21/10/2012,10:00,Amkar,Akhmat Grozny,0,1,A,2.65,3.37,2.85,2.75,3.37,2.9,2.48,3.18,2.76
Russia,Premier League,2012/2013,21/10/2012,12:15,CSKA Moscow,Rubin Kazan,2,0,H,1.96,3.46,4.42,2.04,3.47,4.42,1.96,3.28,3.78
Russia,Premier League,2012/2013,21/10/2012,14:45,M. Saransk,Dynamo Moscow,1,2,A,4.57,3.79,1.85,5.09,3.9,1.91,4.11,3.5,1.82
Russia,Premier League,2012/2013,21/10/2012,17:00,FK Rostov,Lokomotiv Moscow,0,0,D,4.08,3.46,1.99,4.5,3.6,1.99,4,3.33,1.88
Russia,Premier League,2012/2013,22/10/2012,16:00,FK Krylya Sovetov Samara,Volga N. Novgorod,0,1,A,1.88,3.78,4.38,1.91,3.9,4.5,1.83,3.48,4.06
Russia,Premier League,2012/2013,26/10/2012,15:30,Lokomotiv Moscow,Amkar,1,2,A,1.47,4.38,8.77,1.47,4.9,9.8,1.43,4.1,7.43
Russia,Premier League,2012/2013,26/10/2012,17:30,Kuban,FK Rostov,1,0,H,1.69,3.82,5.78,1.75,4.09,5.9,1.67,3.54,5.03
Russia,Premier League,2012/2013,27/10/2012,10:30,Spartak Moscow,M. Saransk,2,0,H,1.27,6.1,13.36,1.29,6.5,15,1.25,5.57,10.33
Russia,Premier League,2012/2013,27/10/2012,13:00,Volga N. Novgorod,Krasnodar,1,1,D,3.64,3.32,2.22,3.75,3.5,2.22,3.4,3.24,2.09
Russia,Premier League,2012/2013,27/10/2012,15:30,Vladikavkaz,Zenit,2,3,A,6.38,4.26,1.58,7.75,4.4,1.59,6.4,4.03,1.48
Russia,Premier League,2012/2013,28/10/2012,09:30,Dynamo Moscow,FK Krylya Sovetov Samara,1,0,H,1.5,4.32,7.83,1.6,4.32,7.9,1.54,3.77,6.08
Russia,Premier League,2012/2013,28/10/2012,12:00,Akhmat Grozny,CSKA Moscow,1,2,A,3.7,3.23,2.24,3.75,3.33,2.25,3.42,3.17,2.1
Russia,Premier League,2012/2013,28/10/2012,14:30,Rubin Kazan,FK Anzi Makhackala,2,1,H,2.74,3.03,3.04,2.94,3.25,3.04,2.62,3.01,2.73
Russia,Premier League,2012/2013,02/11/2012,15:00,Zenit,FK Rostov,2,1,H,1.22,7.1,15,1.25,7.1,15.85,1.22,5.77,11.86
Russia,Premier League,2012/2013,03/11/2012,09:00,Amkar,Kuban,0,3,A,3.04,3.21,2.6,3.04,3.25,2.88,2.7,3.05,2.6
Russia,Premier League,2012/2013,03/11/2012,11:30,FK Krylya Sovetov Samara,Spartak Moscow,0,5,A,4.26,3.68,1.93,4.7,3.7,1.93,4.17,3.39,1.83
Russia,Premier League,2012/2013,03/11/2012,14:00,M. Saransk,Rubin Kazan,1,3,A,7.48,4.22,1.52,7.7,4.22,1.67,6.17,3.73,1.55
Russia,Premier League,2012/2013,04/11/2012,09:30,CSKA Moscow,Lokomotiv Moscow,2,1,H,1.93,3.64,4.32,1.93,3.67,4.8,1.84,3.38,4.21
Russia,Premier League,2012/2013,04/11/2012,11:45,FK Anzi Makhackala,Akhmat Grozny,3,1,H,1.75,3.61,5.72,1.75,3.95,6.25,1.63,3.61,5.3
Russia,Premier League,2012/2013,04/11/2012,14:00,Krasnodar,Dynamo Moscow,2,0,H,3.24,3.26,2.44,3.65,3.3,2.5,2.95,3.13,2.36
Russia,Premier League,2012/2013,05/11/2012,15:00,Vladikavkaz,Volga N. Novgorod,0,2,A,1.95,3.52,4.38,1.98,3.6,4.65,1.88,3.34,4.04
Russia,Premier League,2012/2013,09/11/2012,15:00,FK Rostov,Amkar,3,0,H,2.16,3.27,3.9,2.25,3.3,3.9,2.09,3.16,3.46
Russia,Premier League,2012/2013,10/11/2012,09:30,Dynamo Moscow,Vladikavkaz,2,0,H,1.54,4.34,6.79,1.55,4.34,7.9,1.49,3.96,6.34
Russia,Premier League,2012/2013,10/11/2012,12:00,Akhmat Grozny,M. Saransk,2,1,H,1.47,4.58,7.95,1.5,4.9,8.9,1.44,4.17,6.87
Russia,Premier League,2012/2013,10/11/2012,14:30,Kuban,CSKA Moscow,1,3,A,3.38,3.14,2.43,3.5,3.4,2.43,3.15,3.12,2.25
Russia,Premier League,2012/2013,11/11/2012,09:30,Lokomotiv Moscow,FK Anzi Makhackala,1,1,D,2.8,3.3,2.74,3,3.3,2.75,2.71,3.16,2.53
Russia,Premier League,2012/2013,11/11/2012,11:45,Rubin Kazan,FK Krylya Sovetov Samara,2,0,H,1.37,5.08,10.15,1.4,5.09,13,1.34,4.55,8.66
Russia,Premier League,2012/2013,11/11/2012,14:00,Volga N. Novgorod,Zenit,1,2,A,8.85,5.26,1.39,10,5.4,1.4,7.88,4.52,1.37
Russia,Premier League,2012/2013,11/11/2012,16:15,Spartak Moscow,Krasnodar,2,0,H,1.57,4.3,6.4,1.59,4.5,7.8,1.53,3.96,5.73
Russia,Premier League,2012/2013,17/11/2012,09:30,Volga N. Novgorod,Spartak Moscow,1,1,D,5.92,3.7,1.71,6.4,4,1.71,5.46,3.62,1.61
Russia,Premier League,2012/2013,17/11/2012,12:00,Dynamo Moscow,Zenit,3,0,H,4.05,3.36,2.08,4.15,3.4,2.08,3.77,3.25,1.97
Russia,Premier League,2012/2013,17/11/2012,14:30,Vladikavkaz,Rubin Kazan,0,2,A,4.84,3.69,1.83,4.84,3.75,1.91,4.44,3.47,1.77
Russia,Premier League,2012/2013,18/11/2012,09:30,CSKA Moscow,Amkar,3,0,H,1.29,5.74,13.51,1.33,6,15,1.26,5.24,10.87
Russia,Premier League,2012/2013,18/11/2012,12:00,M. Saransk,Kuban,0,3,A,5.01,3.66,1.81,5.5,3.95,1.81,4.83,3.64,1.67
Russia,Premier League,2012/2013,18/11/2012,14:30,FK Anzi Makhackala,FK Rostov,0,0,D,1.25,6.19,15.75,1.3,6.3,17,1.26,5.16,11.52
Russia,Premier League,2012/2013,19/11/2012,13:45,FK Krylya Sovetov Samara,Lokomotiv Moscow,0,1,A,5.32,3.88,1.72,6.1,4.09,1.75,4.85,3.56,1.68
Russia,Premier League,2012/2013,19/11/2012,15:45,Krasnodar,Akhmat Grozny,3,0,H,2.83,3.34,2.68,2.83,3.4,2.85,2.58,3.16,2.66
Russia,Premier League,2012/2013,23/11/2012,15:00,FK Rostov,M. Saransk,2,0,H,1.57,4.26,6.51,1.58,4.4,7.6,1.51,3.93,6.09
Russia,Premier League,2012/2013,24/11/2012,10:00,Akhmat Grozny,Vladikavkaz,1,0,H,1.5,4.51,7.42,1.5,4.55,8.5,1.44,4.16,6.79
Russia,Premier League,2012/2013,24/11/2012,12:30,Lokomotiv Moscow,Krasnodar,3,2,H,1.71,3.77,5.63,1.71,3.85,6.3,1.65,3.59,5.18
Russia,Premier League,2012/2013,25/11/2012,09:30,Spartak Moscow,Dynamo Moscow,1,5,A,2.18,3.43,3.61,2.29,3.55,3.8,2.04,3.29,3.47
Russia,Premier League,2012/2013,25/11/2012,12:00,Kuban,FK Krylya Sovetov Samara,4,1,H,1.53,4.32,7.15,1.55,5,7.75,1.45,4.09,6.84
Russia,Premier League,2012/2013,26/11/2012,11:30,Amkar,FK Anzi Makhackala,1,2,A,17.88,6.6,1.21,17.88,6.6,1.4,12.76,5.38,1.24
Russia,Premier League,2012/2013,26/11/2012,13:45,Rubin Kazan,Volga N. Novgorod,0,0,D,1.29,5.7,12.94,1.33,6.2,16,1.29,4.99,9.87
Russia,Premier League,2012/2013,26/11/2012,16:00,Zenit,CSKA Moscow,1,1,D,3.03,3.19,2.58,3.2,3.3,3,2.92,3.06,2.44
Russia,Premier League,2012/2013,30/11/2012,14:15,Krasnodar,Kuban,2,1,H,3.25,3.34,2.37,3.35,3.35,2.45,3.01,3.17,2.3
Russia,Premier League,2012/2013,30/11/2012,16:30,Spartak Moscow,Zenit,2,4,A,3.27,3.49,2.27,3.5,3.6,2.29,3.18,3.26,2.17
Russia,Premier League,2012/2013,01/12/2012,09:30,Dynamo Moscow,Rubin Kazan,3,0,H,2.69,3.08,3,2.75,3.15,3.3,2.51,3.02,2.83
Russia,Premier League,2012/2013,01/12/2012,12:00,Vladikavkaz,Lokomotiv Moscow,0,1,A,5.24,3.74,1.75,5.24,4,1.9,4.47,3.45,1.76
Russia,Premier League,2012/2013,01/12/2012,14:30,Volga N. Novgorod,Akhmat Grozny,1,1,D,3.64,3.18,2.27,3.64,3.4,2.33,3.2,3.15,2.22
Russia,Premier League,2012/2013,02/12/2012,09:30,FK Anzi Makhackala,CSKA Moscow,2,0,H,2.39,3.35,3.18,2.47,3.35,3.3,2.37,3.16,2.92
Russia,Premier League,2012/2013,02/12/2012,12:00,FK Krylya Sovetov Samara,FK Rostov,0,2,A,2.98,3.32,2.54,2.98,3.34,2.7,2.7,3.09,2.57
Russia,Premier League,2012/2013,03/12/2012,14:00,M. Saransk,Amkar,1,1,D,4.01,3.73,1.94,4.3,3.75,1.96,3.88,3.44,1.88
Russia,Premier League,2012/2013,07/12/2012,14:30,FK Rostov,Krasnodar,2,3,A,2.8,3.21,2.79,2.8,3.25,3,2.52,3.09,2.77
Russia,Premier League,2012/2013,08/12/2012,08:00,Amkar,FK Krylya Sovetov Samara,0,2,A,2.04,3.52,3.9,2.04,3.52,4.4,1.96,3.27,3.77
Russia,Premier League,2012/2013,08/12/2012,10:30,Kuban,Vladikavkaz,0,0,D,1.44,4.65,8.32,1.44,5,9.5,1.38,4.42,7.77
Russia,Premier League,2012/2013,08/12/2012,13:00,Lokomotiv Moscow,Volga N. Novgorod,0,1,A,1.43,4.59,8.71,1.43,4.9,9.34,1.37,4.45,7.99
Russia,Premier League,2012/2013,09/12/2012,09:30,Akhmat Grozny,Dynamo Moscow,1,2,A,3.22,3.16,2.48,3.35,3.25,2.52,3.03,3.11,2.33
Russia,Premier League,2012/2013,09/12/2012,12:00,CSKA Moscow,M. Saransk,2,1,H,,,,1.14,9.19,37.9,1.12,7.5,17.51
Russia,Premier League,2012/2013,10/12/2012,13:45,Rubin Kazan,Spartak Moscow,0,1,A,2,3.52,4.04,2.1,3.7,4.04,1.96,3.29,3.75
Russia,Premier League,2012/2013,10/12/2012,16:00,Zenit,FK Anzi Makhackala,1,1,D,2.02,3.49,4.01,2.17,3.7,4.01,2.05,3.27,3.49
Russia,Premier League,2012/2013,08/03/2013,09:30,Volga N. Novgorod,Kuban,0,2,A,3.54,3.32,2.24,3.9,3.32,2.33,3.28,3.13,2.2
Russia,Premier League,2012/2013,08/03/2013,12:00,Krasnodar,Amkar,2,1,H,1.66,3.96,5.66,1.75,3.96,6,1.64,3.57,5.29
Russia,Premier League,2012/2013,09/03/2013,09:30,Dynamo Moscow,Lokomotiv Moscow,1,0,H,2.63,3.19,3.02,2.63,3.2,3.25,2.44,3.07,2.91
Russia,Premier League,2012/2013,09/03/2013,12:00,FK Krylya Sovetov Samara,CSKA Moscow,0,2,A,7.81,4.79,1.45,9.1,4.84,1.45,7.73,4.35,1.39
Russia,Premier League,2012/2013,09/03/2013,14:30,Vladikavkaz,FK Rostov,0,0,D,1.71,3.86,5.38,1.71,4.59,6.5,1.57,3.85,5.57
Russia,Premier League,2012/2013,10/03/2013,09:30,Spartak Moscow,Akhmat Grozny,3,1,H,1.66,4.09,5.6,1.72,4.25,6.4,1.63,3.68,5.19
Russia,Premier League,2012/2013,10/03/2013,12:00,Rubin Kazan,Zenit,1,0,H,3.19,3.29,2.46,3.4,3.35,2.5,3.05,3.12,2.32
Russia,Premier League,2012/2013,10/03/2013,12:30,M. Saransk,FK Anzi Makhackala,2,0,H,14.42,5.99,1.27,14.42,5.99,1.3,10.91,5.25,1.26
Russia,Premier League,2012/2013,15/03/2013,15:00,FK Rostov,Volga N. Novgorod,1,2,A,1.99,3.35,4.48,2.02,3.7,5.4,1.89,3.2,4.22
Russia,Premier League,2012/2013,16/03/2013,09:30,Spartak Moscow,Lokomotiv Moscow,0,0,D,2.2,3.53,3.48,2.29,3.7,3.85,2.14,3.28,3.2
Russia,Premier League,2012/2013,16/03/2013,12:00,Amkar,Vladikavkaz,5,1,H,2.33,3.37,3.32,2.44,3.4,3.32,2.27,3.14,3.09
Russia,Premier League,2012/2013,16/03/2013,14:30,Kuban,Dynamo Moscow,1,1,D,2.41,3.21,3.35,2.7,3.4,3.35,2.41,3.09,2.93
Russia,Premier League,2012/2013,17/03/2013,09:30,CSKA Moscow,Krasnodar,1,0,H,1.4,4.94,9.06,1.41,5.5,10,1.34,4.75,8.11
Russia,Premier League,2012/2013,17/03/2013,11:45,FK Anzi Makhackala,FK Krylya Sovetov Samara,1,1,D,1.38,4.96,10.38,1.4,5.5,12,1.31,4.85,8.97
Russia,Premier League,2012/2013,17/03/2013,14:00,Akhmat Grozny,Rubin Kazan,0,0,D,2.85,3.26,2.72,2.96,3.26,2.72,2.77,3.08,2.55
Russia,Premier League,2012/2013,17/03/2013,16:15,Zenit,M. Saransk,1,0,H,1.28,5.89,13.83,1.33,7,16,1.24,5.63,11.19
Russia,Premier League,2012/2013,30/03/2013,09:30,Rubin Kazan,Lokomotiv Moscow,2,0,H,2.29,3.25,3.55,2.4,3.25,3.8,2.26,3.04,3.26
Russia,Premier League,2012/2013,30/03/2013,12:00,FK Krylya Sovetov Samara,M. Saransk,0,2,A,2.52,3.19,3.17,2.6,3.3,3.35,2.36,3.08,3.03
Russia,Premier League,2012/2013,30/03/2013,14:30,Dynamo Moscow,FK Rostov,1,0,H,1.63,4.08,5.94,1.64,4.2,7,1.54,3.82,6.03
Russia,Premier League,2012/2013,31/03/2013,10:30,Volga N. Novgorod,Amkar,1,1,D,2.37,3.24,3.39,2.5,3.29,3.39,2.36,3.1,3
Russia,Premier League,2012/2013,31/03/2013,12:45,Krasnodar,FK Anzi Makhackala,4,0,H,3.22,3.18,2.5,3.3,3.35,2.52,3.09,3.14,2.29
Russia,Premier League,2012/2013,31/03/2013,15:00,Akhmat Grozny,Zenit,0,3,A,4.05,3.44,2.04,4.09,3.5,2.06,3.87,3.27,1.94
Russia,Premier League,2012/2013,31/03/2013,17:15,Spartak Moscow,Kuban,2,2,D,1.86,3.66,4.65,1.9,3.8,4.84,1.8,3.42,4.34
Russia,Premier League,2012/2013,01/04/2013,16:00,Vladikavkaz,CSKA Moscow,0,4,A,6.9,4.38,1.53,8.25,4.5,1.55,6.76,3.95,1.48
Russia,Premier League,2012/2013,05/04/2013,14:00,Amkar,Dynamo Moscow,1,1,D,3.54,3.35,2.24,3.85,3.5,2.24,3.36,3.23,2.13
Russia,Premier League,2012/2013,06/04/2013,11:00,CSKA Moscow,Volga N. Novgorod,2,0,H,1.3,5.54,12.98,1.3,5.6,17,1.27,5.06,11.21
Russia,Premier League,2012/2013,06/04/2013,13:30,FK Rostov,Spartak Moscow,1,0,H,4.44,3.65,1.9,5,3.7,1.92,4.13,3.37,1.85
Russia,Premier League,2012/2013,06/04/2013,16:00,Lokomotiv Moscow,Akhmat Grozny,1,1,D,1.83,3.7,4.79,1.86,3.75,4.79,1.78,3.43,4.48
Russia,Premier League,2012/2013,07/04/2013,10:30,Zenit,FK Krylya Sovetov Samara,1,0,H,1.29,5.62,14.16,1.3,5.8,19,1.26,5.15,11.31
Russia,Premier League,2012/2013,07/04/2013,13:00,FK Anzi Makhackala,Vladikavkaz,0,0,D,1.37,5.01,10.48,1.37,5.5,12,1.32,4.74,9.27
Russia,Premier League,2012/2013,07/04/2013,15:30,Kuban,Rubin Kazan,0,0,D,2.47,3.24,3.21,2.6,3.25,3.21,2.41,3.09,2.93
Russia,Premier League,2012/2013,08/04/2013,16:00,M. Saransk,Krasnodar,0,0,D,3.06,3.48,2.43,3.6,3.48,2.43,3.17,3.19,2.2
Russia,Premier League,2012/2013,12/04/2013,17:00,Dynamo Moscow,CSKA Moscow,0,0,D,3.41,3.28,2.34,3.75,3.3,2.34,3.49,3.15,2.13
Russia,Premier League,2012/2013,13/04/2013,10:30,Lokomotiv Moscow,Zenit,0,1,A,3.67,3.5,2.14,4.09,3.55,2.14,3.59,3.24,2.04
Russia,Premier League,2012/2013,13/04/2013,13:00,Akhmat Grozny,Kuban,2,2,D,2.97,3.16,2.68,3,3.25,2.9,2.67,3.06,2.65
Russia,Premier League,2012/2013,13/04/2013,15:30,Krasnodar,FK Krylya Sovetov Samara,0,3,A,1.67,3.81,6.07,1.7,4,6.2,1.65,3.57,5.28
Russia,Premier League,2012/2013,14/04/2013,11:00,Volga N. Novgorod,FK Anzi Makhackala,0,3,A,4.38,3.35,2,5.9,4,2.02,4.29,3.34,1.84
Russia,Premier League,2012/2013,14/04/2013,13:30,Spartak Moscow,Amkar,2,0,H,1.41,4.88,8.81,1.42,5.2,11,1.36,4.52,8.38
Russia,Premier League,2012/2013,14/04/2013,16:00,Rubin Kazan,FK Rostov,1,1,D,1.53,4.15,7.75,1.58,4.34,9.69,1.51,3.72,6.91
Russia,Premier League,2012/2013,15/04/2013,15:00,Vladikavkaz,M. Saransk,3,1,H,2.93,3.14,2.72,2.93,3.2,3,2.69,2.99,2.69
Russia,Premier League,2012/2013,19/04/2013,14:00,Amkar,Rubin Kazan,1,1,D,4.3,3.39,2,4.4,3.5,2.1,3.8,3.25,1.98
Russia,Premier League,2012/2013,20/04/2013,10:30,M. Saransk,Volga N. Novgorod,1,3,A,2.25,3.29,3.61,2.27,3.29,4.2,2.15,3.12,3.42
Russia,Premier League,2012/2013,20/04/2013,13:00,FK Krylya Sovetov Samara,Vladikavkaz,2,1,H,2.2,3.35,3.64,2.24,3.35,3.9,2.13,3.19,3.4
Russia,Premier League,2012/2013,20/04/2013,15:30,Kuban,Lokomotiv Moscow,0,0,D,2.47,3.3,3.15,2.47,3.32,3.35,2.27,3.16,3.13
Russia,Premier League,2012/2013,21/04/2013,10:30,CSKA Moscow,Spartak Moscow,2,2,D,2.04,3.55,3.94,2.04,3.6,4.3,1.95,3.33,3.76
Russia,Premier League,2012/2013,21/04/2013,13:00,Zenit,Krasnodar,1,0,H,1.42,4.76,8.84,1.46,5.09,10.5,1.39,4.32,7.8
Russia,Premier League,2012/2013,21/04/2013,15:30,FK Anzi Makhackala,Dynamo Moscow,3,3,D,2.06,3.44,4.03,2.08,3.44,4.2,1.93,3.31,3.89
Russia,Premier League,2012/2013,22/04/2013,16:00,FK Rostov,Akhmat Grozny,0,3,A,3.12,3.04,2.65,3.12,3.12,2.72,2.78,3.02,2.59
Russia,Premier League,2012/2013,26/04/2013,16:00,Volga N. Novgorod,FK Krylya Sovetov Samara,1,1,D,2.61,3.2,3.06,2.68,3.2,3.11,2.43,3.02,2.97
Russia,Premier League,2012/2013,27/04/2013,10:30,Dynamo Moscow,M. Saransk,3,1,H,1.44,4.54,8.69,1.44,4.84,10,1.39,4.38,7.78
Russia,Premier League,2012/2013,27/04/2013,13:00,Akhmat Grozny,Amkar,2,1,H,2,3.44,4.23,2.02,3.5,4.75,1.86,3.33,4.18
Russia,Premier League,2012/2013,27/04/2013,15:30,Lokomotiv Moscow,FK Rostov,3,1,H,1.69,3.79,5.78,1.69,3.9,6.75,1.59,3.61,5.84
Russia,Premier League,2012/2013,28/04/2013,10:30,Spartak Moscow,FK Anzi Makhackala,2,0,H,2.43,3.41,3.09,2.5,3.41,3.2,2.33,3.22,2.95
Russia,Premier League,2012/2013,28/04/2013,13:00,Kuban,Zenit,2,2,D,3.83,3.53,2.08,4.2,3.6,2.12,3.65,3.25,2.02
Russia,Premier League,2012/2013,28/04/2013,15:30,Rubin Kazan,CSKA Moscow,2,0,H,3.27,3.21,2.45,3.27,3.25,2.5,3.04,3.11,2.34
Russia,Premier League,2012/2013,29/04/2013,15:30,Vladikavkaz,Krasnodar,2,3,A,3.03,3.33,2.52,3.25,3.33,2.59,3.06,3.11,2.34
Russia,Premier League,2012/2013,03/05/2013,15:00,M. Saransk,Spartak Moscow,2,1,H,8.65,4.8,1.43,10,5.2,1.45,7.8,4.27,1.4
Russia,Premier League,2012/2013,04/05/2013,10:30,CSKA Moscow,Akhmat Grozny,1,0,H,1.38,4.95,10.33,1.4,5.2,12,1.35,4.54,9.05
Russia,Premier League,2012/2013,04/05/2013,12:45,FK Rostov,Kuban,0,2,A,3.56,3.38,2.23,3.56,3.38,2.4,3.21,3.18,2.22
Russia,Premier League,2012/2013,04/05/2013,15:00,FK Anzi Makhackala,Rubin Kazan,2,1,H,2.29,3.23,3.56,2.4,3.3,3.7,2.13,3.15,3.45
Russia,Premier League,2012/2013,04/05/2013,17:15,Zenit,Vladikavkaz,4,0,H,1.19,7.75,17.25,1.2,7.75,24.12,1.17,6.57,15.25
Russia,Premier League,2012/2013,05/05/2013,10:30,FK Krylya Sovetov Samara,Dynamo Moscow,1,2,A,3.89,3.31,2.14,4.25,3.4,2.2,3.64,3.22,2.03
Russia,Premier League,2012/2013,05/05/2013,13:00,Amkar,Lokomotiv Moscow,2,4,A,3.28,3.21,2.45,3.5,3.25,2.45,3.08,3.1,2.3
Russia,Premier League,2012/2013,05/05/2013,15:30,Krasnodar,Volga N. Novgorod,2,0,H,2,3.38,4.34,2.02,3.4,4.84,1.89,3.27,4.06
Russia,Premier League,2012/2013,10/05/2013,14:30,Rubin Kazan,M. Saransk,2,1,H,1.35,5.17,10.71,1.38,5.6,13,1.31,4.88,9.12
Russia,Premier League,2012/2013,10/05/2013,17:00,Spartak Moscow,FK Krylya Sovetov Samara,1,1,D,1.5,4.54,7.29,1.53,5,9.5,1.41,4.45,7.26
Russia,Premier League,2012/2013,11/05/2013,10:30,Dynamo Moscow,Krasnodar,1,1,D,1.7,3.96,5.35,1.7,4,5.8,1.66,3.63,5.06
Russia,Premier League,2012/2013,11/05/2013,13:00,Volga N. Novgorod,Vladikavkaz,1,0,H,1.92,3.62,4.38,1.93,3.62,4.95,1.81,3.4,4.28
Russia,Premier League,2012/2013,11/05/2013,16:30,Kuban,Amkar,4,0,H,1.64,3.98,6.15,1.65,4.25,6.7,1.58,3.73,5.7
Russia,Premier League,2012/2013,12/05/2013,10:30,Lokomotiv Moscow,CSKA Moscow,1,4,A,4,3.54,2.02,4.2,3.6,2.06,3.78,3.31,1.95
Russia,Premier League,2012/2013,12/05/2013,13:00,Akhmat Grozny,FK Anzi Makhackala,1,0,H,3.32,3.41,2.31,3.4,3.45,2.45,3.05,3.2,2.28
Russia,Premier League,2012/2013,12/05/2013,15:30,FK Rostov,Zenit,1,1,D,8,4.8,1.44,9.4,5,1.5,7.21,4.24,1.42
Russia,Premier League,2012/2013,17/05/2013,14:00,Amkar,FK Rostov,3,2,H,2.48,3.16,3.21,2.49,3.3,3.35,2.35,3.09,3.06
Russia,Premier League,2012/2013,18/05/2013,10:30,CSKA Moscow,Kuban,0,0,D,1.59,3.98,6.88,1.6,4.09,7.5,1.53,3.86,6.16
Russia,Premier League,2012/2013,18/05/2013,14:00,M. Saransk,Akhmat Grozny,1,1,D,3.85,3.6,2.04,4,3.6,2.04,3.68,3.38,1.96
Russia,Premier League,2012/2013,18/05/2013,16:30,Krasnodar,Spartak Moscow,0,1,A,3.15,3.57,2.34,3.25,3.65,2.54,3.01,3.26,2.28
Russia,Premier League,2012/2013,19/05/2013,10:30,Vladikavkaz,Dynamo Moscow,1,0,H,7.15,4.2,1.55,7.9,4.45,1.55,6.44,3.94,1.48
Russia,Premier League,2012/2013,19/05/2013,13:00,FK Krylya Sovetov Samara,Rubin Kazan,3,1,H,4.73,3.65,1.85,4.9,3.7,1.91,4.2,3.37,1.84
Russia,Premier League,2012/2013,19/05/2013,15:30,Zenit,Volga N. Novgorod,3,1,H,1.31,5.64,11.6,1.32,6,13,1.27,5.19,10.55
Russia,Premier League,2012/2013,20/05/2013,16:00,FK Anzi Makhackala,Lokomotiv Moscow,2,1,H,1.65,3.95,6,1.69,4.09,6.6,1.63,3.67,5.26
Russia,Premier League,2012/2013,26/05/2013,10:30,Akhmat Grozny,FK Krylya Sovetov Samara,4,1,H,2.58,3.37,2.89,2.58,3.6,2.98,2.43,3.24,2.77
Russia,Premier League,2012/2013,26/05/2013,10:30,Amkar,Zenit,0,0,D,3.14,3.48,2.35,3.14,3.6,2.4,2.93,3.32,2.28
Russia,Premier League,2012/2013,26/05/2013,10:30,Dynamo Moscow,Volga N. Novgorod,0,0,D,1.65,3.9,5.94,1.65,4,7.5,1.55,3.71,6.02
Russia,Premier League,2012/2013,26/05/2013,10:30,FK Rostov,CSKA Moscow,3,0,H,2.54,3.39,2.92,2.54,3.7,3,2.37,3.32,2.77
Russia,Premier League,2012/2013,26/05/2013,10:30,Kuban,FK Anzi Makhackala,1,0,H,1.77,3.82,4.92,1.77,4.4,6,1.64,3.69,4.99
Russia,Premier League,2012/2013,26/05/2013,10:30,Lokomotiv Moscow,M. Saransk,2,1,H,1.6,4.18,6.12,1.6,4.8,7.5,1.49,4.08,6.15
Russia,Premier League,2012/2013,26/05/2013,10:30,Rubin Kazan,Krasnodar,2,0,H,1.55,4.26,6.71,1.65,4.26,7.3,1.55,3.75,6.02
Russia,Premier League,2012/2013,26/05/2013,10:30,Spartak Moscow,Vladikavkaz,2,0,H,,,,1.24,7.8,15.33,1.2,6.23,11.64
Russia,Premier League,2012/2013,30/05/2013,15:30,FK Krylya Sovetov Samara,Spartak Nalchik,2,0,H,1.58,4.03,6.98,1.58,4.28,7.87,1.5,3.81,6.56
Russia,Premier League,2012/2013,30/05/2013,17:30,FK Rostov,SKA Khabarovsk,2,0,H,1.44,4.71,8.63,1.44,4.8,9.31,1.38,4.36,8.13
Russia,Premier League,2012/2013,03/06/2013,09:00,SKA Khabarovsk,FK Rostov,0,1,A,3.42,3.26,2.31,3.42,3.3,2.5,3.07,3.11,2.3
Russia,Premier League,2012/2013,03/06/2013,16:00,Spartak Nalchik,FK Krylya Sovetov Samara,2,5,A,2.68,3.3,2.86,2.75,3.3,2.86,2.63,3.06,2.67
Russia,Premier League,2013/2014,14/07/2013,10:30,Dynamo Moscow,Volga N. Novgorod,2,2,D,1.64,3.8,6.4,1.65,3.85,7,1.57,3.66,6.03
Russia,Premier League,2013/2014,14/07/2013,15:30,FK Anzi Makhackala,Lokomotiv Moscow,2,2,D,1.73,3.7,5.66,1.75,3.75,5.75,1.65,3.58,5.21
Russia,Premier League,2013/2014,14/07/2013,18:00,Kuban,Rubin Kazan,1,1,D,2.31,3.33,3.42,2.45,3.33,3.42,2.29,3.16,3.07
Russia,Premier League,2013/2014,15/07/2013,17:00,FK Rostov,Akhmat Grozny,2,1,H,2.82,3.21,2.79,2.82,3.4,3.05,2.65,3.07,2.68
Russia,Premier League,2013/2014,16/07/2013,14:00,Amkar,Tomsk,2,0,H,2.16,3.19,4.01,2.16,3.45,4.33,2.04,3.16,3.73
Russia,Premier League,2013/2014,16/07/2013,16:30,FK Krylya Sovetov Samara,Spartak Moscow,1,2,A,4.15,3.51,2,5.3,3.7,2,4.19,3.45,1.83
Russia,Premier League,2013/2014,17/07/2013,14:30,Ural,CSKA Moscow,2,2,D,8.96,4.76,1.41,10.5,5,1.45,7.69,4.35,1.4
Russia,Premier League,2013/2014,17/07/2013,17:00,Krasnodar,Zenit,1,2,A,4.13,3.29,2.09,4.59,3.55,2.15,3.68,3.26,2
Russia,Premier League,2013/2014,19/07/2013,17:00,Dynamo Moscow,FK Anzi Makhackala,2,1,H,3.58,3.33,2.24,3.75,3.6,2.25,3.29,3.2,2.17
Russia,Premier League,2013/2014,20/07/2013,13:00,Tomsk,Kuban,1,2,A,3.9,3.31,2.14,4.45,3.5,2.36,3.6,3.23,2.05
Russia,Premier League,2013/2014,20/07/2013,15:30,Volga N. Novgorod,Lokomotiv Moscow,1,2,A,4.21,3.6,1.95,4.4,3.65,2.06,3.84,3.28,1.95
Russia,Premier League,2013/2014,20/07/2013,18:00,Akhmat Grozny,Amkar,1,1,D,1.76,3.58,5.59,1.76,3.95,5.73,1.71,3.45,4.94
Russia,Premier League,2013/2014,21/07/2013,10:30,Rubin Kazan,Zenit,2,1,H,2.67,3.28,2.89,2.9,3.28,2.89,2.7,3.11,2.61
Russia,Premier League,2013/2014,21/07/2013,13:00,Ural,Spartak Moscow,0,2,A,6.02,4.05,1.62,6.5,4.3,1.7,5.73,3.76,1.57
Russia,Premier League,2013/2014,21/07/2013,17:00,FK Rostov,Krasnodar,2,2,D,2.98,3.26,2.62,2.98,3.26,2.9,2.67,3.07,2.63
Russia,Premier League,2013/2014,22/07/2013,17:00,CSKA Moscow,FK Krylya Sovetov Samara,2,1,H,1.28,6.13,12.32,1.29,6.5,15,1.24,5.68,10.9
Russia,Premier League,2013/2014,26/07/2013,17:00,Zenit,Kuban,1,1,D,1.72,3.82,5.4,1.75,4,6,1.66,3.61,5.11
Russia,Premier League,2013/2014,27/07/2013,10:30,Dynamo Moscow,Spartak Moscow,1,4,A,3.37,3.37,2.31,3.55,3.45,2.31,3.17,3.22,2.22
Russia,Premier League,2013/2014,27/07/2013,13:30,Ural,Volga N. Novgorod,1,2,A,2.38,3.31,3.3,2.45,3.31,3.45,2.32,3.14,3.04
Russia,Premier League,2013/2014,27/07/2013,17:00,FK Rostov,Tomsk,3,0,H,1.76,3.72,5.23,1.8,3.9,5.7,1.74,3.5,4.64
Russia,Premier League,2013/2014,28/07/2013,10:30,Lokomotiv Moscow,CSKA Moscow,1,2,A,3.46,3.41,2.24,3.7,3.46,2.24,3.33,3.28,2.13
Russia,Premier League,2013/2014,28/07/2013,15:30,FK Krylya Sovetov Samara,FK Anzi Makhackala,1,1,D,5.77,3.87,1.68,5.77,3.87,1.84,4.91,3.48,1.71
Russia,Premier League,2013/2014,28/07/2013,18:00,Akhmat Grozny,Rubin Kazan,0,0,D,3.31,3.26,2.39,3.35,3.35,2.6,2.99,3.1,2.39
Russia,Premier League,2013/2014,29/07/2013,17:00,Krasnodar,Amkar,2,1,H,1.75,3.77,5.31,1.91,4,5.7,1.71,3.51,4.87
Russia,Premier League,2013/2014,02/08/2013,17:00,FK Anzi Makhackala,FK Rostov,0,1,A,1.55,4.26,6.77,1.6,4.5,7.1,1.53,3.99,5.85
Russia,Premier League,2013/2014,03/08/2013,10:30,Volga N. Novgorod,Zenit,1,3,A,6.55,4.03,1.6,8.1,4.34,1.6,5.92,3.81,1.55
Russia,Premier League,2013/2014,03/08/2013,14:20,Tomsk,Ural,1,2,A,2.5,3.15,3.25,2.5,3.2,3.25,2.37,3.11,2.96
Russia,Premier League,2013/2014,03/08/2013,15:30,Dynamo Moscow,Akhmat Grozny,1,0,H,1.93,3.47,4.59,1.96,3.6,4.59,1.86,3.39,4.07
Russia,Premier League,2013/2014,04/08/2013,10:30,Rubin Kazan,CSKA Moscow,0,0,D,2.83,3.28,2.73,3.05,3.35,2.73,2.77,3.16,2.51
Russia,Premier League,2013/2014,04/08/2013,13:00,Amkar,FK Krylya Sovetov Samara,0,0,D,1.98,3.41,4.36,2.06,3.5,4.36,1.94,3.28,3.88
Russia,Premier League,2013/2014,04/08/2013,17:30,Kuban,Spartak Moscow,2,2,D,3.03,3.25,2.58,3.4,3.45,2.58,2.87,3.19,2.4
Russia,Premier League,2013/2014,05/08/2013,18:15,Lokomotiv Moscow,Krasnodar,3,1,H,1.75,3.97,4.9,1.85,3.97,4.95,1.72,3.56,4.46
Russia,Premier League,2013/2014,17/08/2013,10:30,Ural,Amkar,0,0,D,2.67,3.33,2.85,2.67,3.33,3,2.49,3.15,2.76
Russia,Premier League,2013/2014,17/08/2013,15:15,Zenit,FK Anzi Makhackala,3,0,H,1.47,4.59,7.95,1.5,4.8,9.3,1.42,4.29,7.22
Russia,Premier League,2013/2014,17/08/2013,17:30,Akhmat Grozny,Lokomotiv Moscow,0,1,A,2.97,3.33,2.57,3.1,3.33,2.65,2.85,3.15,2.45
Russia,Premier League,2013/2014,18/08/2013,10:30,CSKA Moscow,Kuban,1,0,H,1.78,3.66,5.28,1.78,3.9,5.7,1.66,3.6,5.07
Russia,Premier League,2013/2014,18/08/2013,12:45,Spartak Moscow,Rubin Kazan,0,0,D,2.25,3.22,3.67,2.25,3.45,3.95,2.09,3.27,3.42
Russia,Premier League,2013/2014,18/08/2013,15:00,FK Krylya Sovetov Samara,Tomsk,1,0,H,1.87,3.71,4.47,1.94,3.71,4.9,1.84,3.33,4.26
Russia,Premier League,2013/2014,18/08/2013,17:15,Krasnodar,Dynamo Moscow,1,1,D,2.71,3.21,2.89,2.95,3.3,2.89,2.65,3.15,2.6
Russia,Premier League,2013/2014,19/08/2013,17:00,FK Rostov,Volga N. Novgorod,4,0,H,1.88,3.53,4.75,1.91,3.75,5.5,1.8,3.39,4.39
Russia,Premier League,2013/2014,24/08/2013,10:30,Dynamo Moscow,Zenit,1,1,D,3.69,3.39,2.18,3.95,3.45,2.25,3.39,3.21,2.13
Russia,Premier League,2013/2014,24/08/2013,13:00,Tomsk,CSKA Moscow,1,2,A,8.83,4.72,1.43,9.8,4.9,1.43,7.97,4.36,1.39
Russia,Premier League,2013/2014,24/08/2013,15:30,Volga N. Novgorod,Akhmat Grozny,1,0,H,3.12,3.31,2.49,3.35,3.35,2.54,2.92,3.1,2.43
Russia,Premier League,2013/2014,24/08/2013,18:00,FK Anzi Makhackala,Krasnodar,1,2,A,2.8,3.21,2.8,3.08,3.4,2.8,2.75,3.19,2.51
Russia,Premier League,2013/2014,25/08/2013,14:30,Rubin Kazan,FK Krylya Sovetov Samara,1,1,D,1.53,4.03,7.89,1.53,4.65,9.4,1.47,3.93,7.03
Russia,Premier League,2013/2014,25/08/2013,17:00,Kuban,Ural,3,2,H,1.5,4.11,8.67,1.6,4.15,8.67,1.52,3.75,6.72
Russia,Premier League,2013/2014,26/08/2013,14:45,Amkar,Spartak Moscow,2,1,H,4.45,3.58,1.92,4.95,3.85,1.94,4.3,3.41,1.82
Russia,Premier League,2013/2014,26/08/2013,17:00,Lokomotiv Moscow,FK Rostov,5,0,H,1.64,4.11,5.84,1.7,4.2,6.04,1.62,3.7,5.43
Russia,Premier League,2013/2014,30/08/2013,17:00,CSKA Moscow,Amkar,2,1,H,1.35,5.18,11.11,1.37,5.5,13,1.33,4.76,8.92
Russia,Premier League,2013/2014,31/08/2013,15:45,Akhmat Grozny,FK Anzi Makhackala,1,1,D,1.98,3.53,4.24,1.99,3.65,5,1.86,3.39,4.15
Russia,Premier League,2013/2014,31/08/2013,18:00,Krasnodar,Volga N. Novgorod,3,0,H,1.63,4.1,6.05,1.67,4.1,6.5,1.61,3.75,5.42
Russia,Premier League,2013/2014,01/09/2013,10:30,Ural,Rubin Kazan,0,3,A,5.04,3.62,1.82,5.5,3.65,1.95,4.24,3.39,1.83
Russia,Premier League,2013/2014,01/09/2013,10:30,Zenit,Lokomotiv Moscow,2,1,H,1.94,3.39,4.57,2.05,3.5,4.6,1.9,3.36,3.97
Russia,Premier League,2013/2014,01/09/2013,12:45,Spartak Moscow,Tomsk,2,1,H,1.36,5.25,10.05,1.36,5.8,13,1.27,5.21,10.31
Russia,Premier League,2013/2014,01/09/2013,15:00,FK Krylya Sovetov Samara,Kuban,0,0,D,3.64,3.31,2.22,3.75,3.4,2.25,3.31,3.22,2.15
Russia,Premier League,2013/2014,01/09/2013,17:15,Dynamo Moscow,FK Rostov,1,1,D,1.62,4.08,6.09,1.62,4.25,7.32,1.55,3.71,6.22
Russia,Premier League,2013/2014,14/09/2013,10:30,CSKA Moscow,FK Rostov,1,0,H,1.45,4.48,8.85,1.45,4.85,9.5,1.41,4.28,7.69
Russia,Premier League,2013/2014,14/09/2013,12:45,Volga N. Novgorod,Spartak Moscow,0,1,A,5.46,3.83,1.72,6.2,3.95,1.72,5.24,3.6,1.64
Russia,Premier League,2013/2014,14/09/2013,15:00,Krasnodar,FK Krylya Sovetov Samara,1,1,D,1.67,3.98,5.75,1.73,4.05,6.1,1.64,3.63,5.2
Russia,Premier League,2013/2014,14/09/2013,17:15,Zenit,Akhmat Grozny,2,0,H,1.38,4.9,10.05,1.4,5.2,10.05,1.37,4.51,7.98
Russia,Premier League,2013/2014,15/09/2013,10:30,Lokomotiv Moscow,Kuban,1,0,H,2,3.54,4.11,2.02,3.7,5.2,1.89,3.33,4.05
Russia,Premier League,2013/2014,15/09/2013,12:45,Tomsk,FK Anzi Makhackala,2,2,D,2.98,3.28,2.6,3.25,3.3,2.6,2.95,3.09,2.42
Russia,Premier League,2013/2014,15/09/2013,15:00,Amkar,Rubin Kazan,0,0,D,3.96,3.32,2.12,4.33,3.45,2.15,3.63,3.19,2.05
Russia,Premier League,2013/2014,16/09/2013,14:00,Ural,Dynamo Moscow,1,4,A,5.75,3.75,1.71,6.8,4.1,1.75,5.2,3.61,1.65
Russia,Premier League,2013/2014,21/09/2013,10:30,Dynamo Moscow,Lokomotiv Moscow,1,3,A,2.71,3.21,2.9,2.71,3.35,3.34,2.33,3.17,3.02
Russia,Premier League,2013/2014,21/09/2013,13:00,FK Krylya Sovetov Samara,Ural,1,1,D,1.79,3.67,5.15,2,3.7,5.15,1.83,3.41,4.25
Russia,Premier League,2013/2014,21/09/2013,15:30,Akhmat Grozny,Krasnodar,0,1,A,2.62,3.27,2.96,2.82,3.3,3.05,2.57,3.1,2.74
Russia,Premier League,2013/2014,22/09/2013,10:30,Spartak Moscow,CSKA Moscow,3,0,H,2.87,3.32,2.66,2.98,3.35,2.75,2.78,3.11,2.53
Russia,Premier League,2013/2014,22/09/2013,10:30,Volga N. Novgorod,FK Anzi Makhackala,2,1,H,2.56,3.26,3.05,2.56,3.35,3.35,2.3,3.13,3.11
Russia,Premier League,2013/2014,22/09/2013,13:00,Rubin Kazan,Tomsk,1,2,A,1.33,5.19,11.9,1.33,5.8,14.87,1.3,4.84,10.27
Russia,Premier League,2013/2014,22/09/2013,15:15,Kuban,Amkar,0,3,A,1.69,3.65,6.25,1.76,3.7,6.5,1.67,3.45,5.31
Russia,Premier League,2013/2014,22/09/2013,17:30,FK Rostov,Zenit,0,4,A,5.6,3.79,1.71,5.8,3.85,1.8,4.78,3.51,1.72
Russia,Premier League,2013/2014,25/09/2013,15:15,FK Krylya Sovetov Samara,Zenit,1,4,A,5.65,4.21,1.64,7.5,4.9,1.64,6.26,4.05,1.5
Russia,Premier League,2013/2014,25/09/2013,15:15,Spartak Moscow,Krasnodar,3,2,H,1.6,4.29,6.04,1.6,4.6,7.9,1.54,3.91,5.93
Russia,Premier League,2013/2014,25/09/2013,16:00,Kuban,Akhmat Grozny,3,1,H,1.72,3.78,5.58,1.75,3.9,5.9,1.69,3.57,4.89
Russia,Premier League,2013/2014,25/09/2013,17:30,CSKA Moscow,FK Anzi Makhackala,0,0,D,1.47,4.48,8.18,1.47,5.4,12,1.4,4.38,7.93
Russia,Premier League,2013/2014,26/09/2013,13:00,Tomsk,Volga N. Novgorod,1,0,H,2.45,3.26,3.23,2.55,3.4,3.31,2.35,3.14,3
Russia,Premier League,2013/2014,26/09/2013,14:00,Amkar,FK Rostov,1,0,H,1.98,3.42,4.42,2.15,3.55,4.6,1.97,3.27,3.84
Russia,Premier League,2013/2014,26/09/2013,15:15,Ural,Lokomotiv Moscow,0,3,A,6.75,4.28,1.56,7.7,4.65,1.58,6.24,3.97,1.5
Russia,Premier League,2013/2014,26/09/2013,17:30,Rubin Kazan,Dynamo Moscow,2,2,D,2.25,3.07,3.32,2.6,3.3,3.58,2.25,3.13,3.2
Russia,Premier League,2013/2014,28/09/2013,13:00,Akhmat Grozny,CSKA Moscow,2,0,H,5.04,3.68,1.8,5.8,3.9,1.86,4.82,3.42,1.74
Russia,Premier League,2013/2014,28/09/2013,15:00,Zenit,Spartak Moscow,4,2,H,1.71,4,5.21,1.85,4.1,5.21,1.72,3.63,4.54
Russia,Premier League,2013/2014,29/09/2013,10:30,Dynamo Moscow,FK Krylya Sovetov Samara,2,0,H,1.48,4.49,8,1.51,5.3,10,1.43,4.15,7.22
Russia,Premier League,2013/2014,29/09/2013,12:45,Volga N. Novgorod,Kuban,1,0,H,4.83,3.42,1.9,4.83,3.48,2.05,4.03,3.28,1.91
Russia,Premier League,2013/2014,29/09/2013,15:00,Krasnodar,Rubin Kazan,1,0,H,2.75,3.18,2.88,2.75,3.3,2.95,2.57,3.07,2.76
Russia,Premier League,2013/2014,29/09/2013,17:15,FK Anzi Makhackala,Amkar,2,2,D,2.6,3.24,3,2.6,3.25,3.45,2.44,3.06,2.93
Russia,Premier League,2013/2014,30/09/2013,15:15,Lokomotiv Moscow,Tomsk,0,0,D,1.22,6.66,18.23,1.3,6.9,18.23,1.23,5.71,11.73
Russia,Premier League,2013/2014,30/09/2013,17:30,FK Rostov,Ural,1,1,D,1.63,4.02,6.12,1.67,4.45,7.3,1.57,3.76,5.92
Russia,Premier League,2013/2014,04/10/2013,16:00,Volga N. Novgorod,Amkar,0,2,A,3.44,3.41,2.27,3.8,3.41,2.5,3.15,3.13,2.28
Russia,Premier League,2013/2014,05/10/2013,10:30,Ural,Krasnodar,0,2,A,4.44,3.65,1.92,4.5,3.7,2.05,4.02,3.34,1.9
Russia,Premier League,2013/2014,05/10/2013,13:00,FK Krylya Sovetov Samara,Lokomotiv Moscow,2,2,D,5.29,3.78,1.75,5.9,3.8,1.76,5.03,3.63,1.66
Russia,Premier League,2013/2014,06/10/2013,10:30,CSKA Moscow,Dynamo Moscow,0,2,A,2.64,3.3,2.92,2.72,3.4,3.06,2.51,3.16,2.77
Russia,Premier League,2013/2014,06/10/2013,10:30,Spartak Moscow,Akhmat Grozny,0,0,D,1.65,3.93,6.04,1.65,4.5,7.3,1.55,3.96,5.65
Russia,Premier League,2013/2014,06/10/2013,12:45,Tomsk,Zenit,0,3,A,8.97,4.82,1.42,10.5,5,1.44,7.73,4.5,1.38
Russia,Premier League,2013/2014,06/10/2013,15:00,Rubin Kazan,FK Anzi Makhackala,5,1,H,1.51,4.12,7.9,1.54,4.6,8.5,1.46,4.03,7.06
Russia,Premier League,2013/2014,06/10/2013,17:15,Kuban,FK Rostov,2,2,D,1.68,3.95,5.64,1.7,3.95,6.2,1.63,3.61,5.32
Russia,Premier League,2013/2014,18/10/2013,17:00,Zenit,CSKA Moscow,2,0,H,1.61,4.17,6.13,1.75,4.3,6.13,1.6,3.81,5.38
Russia,Premier League,2013/2014,19/10/2013,10:30,Akhmat Grozny,Ural,1,1,D,1.61,3.95,6.64,1.67,4.33,7.1,1.56,3.8,5.76
Russia,Premier League,2013/2014,19/10/2013,13:00,Krasnodar,Tomsk,4,0,H,1.52,4.34,7.21,1.57,4.55,7.21,1.5,4.02,6.25
Russia,Premier League,2013/2014,20/10/2013,10:30,FK Anzi Makhackala,Spartak Moscow,0,1,A,4.84,3.75,1.81,5.6,4.25,1.81,4.62,3.68,1.7
Russia,Premier League,2013/2014,20/10/2013,12:45,FK Rostov,FK Krylya Sovetov Samara,1,2,A,2.18,3.1,4.1,2.2,3.35,4.15,2.06,3.15,3.64
Russia,Premier League,2013/2014,20/10/2013,15:00,Dynamo Moscow,Kuban,3,1,H,1.68,3.89,5.72,1.77,4.1,5.9,1.69,3.59,4.89
Russia,Premier League,2013/2014,20/10/2013,17:15,Volga N. Novgorod,Rubin Kazan,2,1,H,5.75,4.1,1.65,6.6,4.3,1.7,5.41,3.72,1.61
Russia,Premier League,2013/2014,21/10/2013,16:00,Lokomotiv Moscow,Amkar,4,0,H,1.68,3.84,5.96,1.73,4.05,6,1.63,3.62,5.36
Russia,Premier League,2013/2014,25/10/2013,16:00,FK Krylya Sovetov Samara,Volga N. Novgorod,2,2,D,2.17,3.19,4.01,2.17,3.3,4.4,2.07,3.11,3.69
Russia,Premier League,2013/2014,26/10/2013,09:30,Tomsk,Akhmat Grozny,0,0,D,3,3.18,2.65,3.05,3.2,2.7,2.85,3.09,2.48
Russia,Premier League,2013/2014,26/10/2013,11:45,Amkar,Dynamo Moscow,2,1,H,3.9,3.53,2.06,4.25,3.7,2.2,3.52,3.27,2.06
Russia,Premier League,2013/2014,26/10/2013,14:00,Ural,Zenit,1,2,A,11.56,5.74,1.3,16,6.3,1.33,10.26,5.32,1.27
Russia,Premier League,2013/2014,26/10/2013,16:30,Spartak Moscow,FK Rostov,2,0,H,1.44,4.71,8.38,1.44,4.95,10,1.39,4.3,8.1
Russia,Premier League,2013/2014,27/10/2013,09:30,Rubin Kazan,Lokomotiv Moscow,1,2,A,2.72,3.06,2.8,2.96,3.3,2.82,2.58,3.09,2.73
Russia,Premier League,2013/2014,27/10/2013,12:00,CSKA Moscow,Krasnodar,5,1,H,1.75,3.84,5.14,1.77,4.1,5.5,1.71,3.58,4.71
Russia,Premier League,2013/2014,28/10/2013,15:00,Kuban,FK Anzi Makhackala,2,0,H,1.56,4.09,7.22,1.65,4.4,7.22,1.55,3.76,5.99
Russia,Premier League,2013/2014,02/11/2013,09:30,Volga N. Novgorod,CSKA Moscow,1,2,A,6.4,4.14,1.6,7.5,4.45,1.6,5.75,3.9,1.54
Russia,Premier League,2013/2014,02/11/2013,12:00,Dynamo Moscow,Tomsk,1,0,H,1.35,5.15,11.27,1.36,5.3,12,1.3,4.93,9.64
Russia,Premier League,2013/2014,02/11/2013,14:30,Zenit,Amkar,1,1,D,1.31,5.7,11.97,1.32,6,13,1.26,5.42,10.39
Russia,Premier League,2013/2014,03/11/2013,09:30,Krasnodar,Kuban,1,2,A,2.61,3.34,2.93,2.61,3.34,3.3,2.46,3.13,2.86
Russia,Premier League,2013/2014,03/11/2013,11:45,FK Rostov,Rubin Kazan,0,0,D,3.41,3.24,2.36,3.7,3.3,2.36,3.33,3.19,2.16
Russia,Premier League,2013/2014,03/11/2013,14:00,Spartak Moscow,Lokomotiv Moscow,1,3,A,2.9,3.28,2.66,2.9,3.3,2.8,2.74,3.07,2.58
Russia,Premier League,2013/2014,03/11/2013,16:15,FK Anzi Makhackala,Ural,0,1,A,1.92,3.54,4.5,1.95,3.75,4.9,1.87,3.41,4.02
Russia,Premier League,2013/2014,04/11/2013,12:00,Akhmat Grozny,FK Krylya Sovetov Samara,0,1,A,2.01,3.38,4.35,2.03,3.5,4.35,1.94,3.22,3.96
Russia,Premier League,2013/2014,08/11/2013,13:00,Ural,FK Rostov,1,4,A,3,3.17,2.64,3.13,3.2,2.64,2.89,3.06,2.47
Russia,Premier League,2013/2014,09/11/2013,09:30,Tomsk,Lokomotiv Moscow,2,0,H,7.36,4.4,1.51,9.2,4.5,1.52,6.8,4.06,1.47
Russia,Premier League,2013/2014,09/11/2013,12:00,FK Krylya Sovetov Samara,Dynamo Moscow,1,2,A,5.03,3.45,1.86,5.7,3.5,1.95,4.25,3.33,1.85
Russia,Premier League,2013/2014,10/11/2013,09:30,Spartak Moscow,Zenit,4,2,H,3.53,3.58,2.15,3.8,3.63,2.2,3.35,3.31,2.1
Russia,Premier League,2013/2014,10/11/2013,10:00,Amkar,FK Anzi Makhackala,1,0,H,1.71,3.7,5.82,1.77,3.9,6,1.67,3.51,5.24
Russia,Premier League,2013/2014,10/11/2013,11:45,CSKA Moscow,Akhmat Grozny,4,1,H,1.52,4.17,7.81,1.55,4.5,8.8,1.47,3.98,7.04
Russia,Premier League,2013/2014,10/11/2013,14:00,Rubin Kazan,Krasnodar,0,1,A,1.78,3.61,5.17,1.95,3.61,5.4,1.79,3.36,4.52
Russia,Premier League,2013/2014,10/11/2013,16:15,Kuban,Volga N. Novgorod,4,0,H,1.53,4.22,7.55,1.57,4.22,8.1,1.51,3.9,6.4
Russia,Premier League,2013/2014,22/11/2013,15:00,Zenit,FK Rostov,0,2,A,1.28,6.14,12.16,1.33,6.5,14,1.28,5.33,9.78
Russia,Premier League,2013/2014,23/11/2013,08:30,Tomsk,Rubin Kazan,0,1,A,3.63,3.15,2.32,3.9,3.3,2.35,3.47,3.07,2.16
Russia,Premier League,2013/2014,23/11/2013,10:45,Amkar,Kuban,3,1,H,2.62,3.28,2.95,2.62,3.45,3.05,2.41,3.13,2.91
Russia,Premier League,2013/2014,23/11/2013,13:00,CSKA Moscow,Spartak Moscow,1,0,H,2.18,3.49,3.58,2.35,3.7,3.58,2.14,3.3,3.27
Russia,Premier League,2013/2014,24/11/2013,09:30,Lokomotiv Moscow,Dynamo Moscow,1,0,H,2.16,3.28,3.28,3.1,4.2,3.75,2.22,3.24,3.17
Russia,Premier League,2013/2014,24/11/2013,12:00,Ural,FK Krylya Sovetov Samara,1,1,D,3.17,3.11,2.57,3.17,3.2,2.68,2.89,3.02,2.49
Russia,Premier League,2013/2014,24/11/2013,14:30,FK Anzi Makhackala,Volga N. Novgorod,0,0,D,2.04,3.02,4,2.25,3.35,4.15,2.08,3.14,3.56
Russia,Premier League,2013/2014,25/11/2013,15:00,Krasnodar,Akhmat Grozny,3,2,H,1.82,3.65,4.93,1.82,4.05,6.6,1.72,3.5,4.76
Russia,Premier League,2013/2014,30/11/2013,10:00,Dynamo Moscow,Ural,3,0,H,1.28,5.83,14.31,1.35,5.83,14.31,1.29,4.91,10.37
Russia,Premier League,2013/2014,01/12/2013,09:30,Akhmat Grozny,Zenit,1,1,D,5.86,3.97,1.66,7.3,4.2,1.66,6.04,3.87,1.54
Russia,Premier League,2013/2014,01/12/2013,12:00,FK Krylya Sovetov Samara,Krasnodar,1,0,H,3.17,3.18,2.54,3.17,3.3,2.6,2.9,3.03,2.48
Russia,Premier League,2013/2014,01/12/2013,14:30,Spartak Moscow,Volga N. Novgorod,6,1,H,1.41,4.81,9.2,1.42,5,10.5,1.34,4.65,8.84
Russia,Premier League,2013/2014,02/12/2013,13:00,FK Anzi Makhackala,Tomsk,0,2,A,2.23,3.18,3.82,2.25,3.3,4.05,2.14,3.11,3.49
Russia,Premier League,2013/2014,02/12/2013,13:00,FK Rostov,CSKA Moscow,0,0,D,4.26,3.35,2.03,4.6,3.55,2.09,4.04,3.27,1.92
Russia,Premier League,2013/2014,02/12/2013,15:30,Kuban,Lokomotiv Moscow,1,3,A,3.37,3.48,2.28,3.6,3.48,2.44,3.13,3.18,2.27
Russia,Premier League,2013/2014,02/12/2013,15:30,Rubin Kazan,Amkar,3,0,H,2.14,3.19,4.07,2.19,3.3,4.7,2.01,3.12,3.89
Russia,Premier League,2013/2014,06/12/2013,13:45,Krasnodar,CSKA Moscow,1,0,H,3.13,3.38,2.44,3.65,3.55,2.44,3.13,3.23,2.24
Russia,Premier League,2013/2014,06/12/2013,16:00,Zenit,Ural,2,1,H,1.19,7.47,19.5,1.22,7.49,21.35,1.18,6.48,14.56
Russia,Premier League,2013/2014,07/12/2013,09:30,Volga N. Novgorod,FK Krylya Sovetov Samara,1,2,A,2.75,2.91,2.74,2.8,3.2,3.11,2.6,3,2.78
Russia,Premier League,2013/2014,07/12/2013,12:00,FK Anzi Makhackala,Kuban,0,0,D,4.43,3.27,2.02,4.43,3.65,2.3,3.77,3.23,2
Russia,Premier League,2013/2014,07/12/2013,14:30,Lokomotiv Moscow,Rubin Kazan,0,0,D,1.76,3.6,5.54,1.8,3.7,6.2,1.72,3.41,5.05
Russia,Premier League,2013/2014,08/12/2013,09:30,FK Rostov,Spartak Moscow,0,1,A,3.76,3.43,2.14,4.8,3.75,2.14,3.88,3.26,1.95
Russia,Premier League,2013/2014,08/12/2013,12:00,Dynamo Moscow,Amkar,2,0,H,1.71,3.52,6.32,1.75,3.75,7.4,1.64,3.51,5.6
Russia,Premier League,2013/2014,08/12/2013,12:30,Akhmat Grozny,Tomsk,2,0,H,1.72,3.6,6.05,1.8,3.8,6.4,1.7,3.44,5.07
Russia,Premier League,2013/2014,08/03/2014,12:30,Krasnodar,Ural,0,1,A,1.55,4.21,7.11,1.55,4.33,7.7,1.48,4.06,6.65
Russia,Premier League,2013/2014,08/03/2014,15:00,Akhmat Grozny,Spartak Moscow,1,0,H,3.49,3.36,2.27,3.9,3.4,2.27,3.44,3.23,2.1
Russia,Premier League,2013/2014,09/03/2014,09:30,Dynamo Moscow,CSKA Moscow,4,2,H,2.36,3.33,3.32,2.4,3.33,3.4,2.31,3.14,3.1
Russia,Premier League,2013/2014,09/03/2014,12:00,FK Anzi Makhackala,Rubin Kazan,1,0,H,2.51,3.21,3.17,2.51,3.24,3.45,2.31,3.09,3.13
Russia,Premier League,2013/2014,09/03/2014,14:30,Zenit,Tomsk,0,0,D,1.29,5.77,13.49,1.3,6.25,15,1.25,5.63,10.91
Russia,Premier League,2013/2014,10/03/2014,10:00,Amkar,Volga N. Novgorod,5,1,H,1.66,3.69,6.58,1.75,3.75,6.9,1.63,3.51,5.66
Russia,Premier League,2013/2014,10/03/2014,12:30,Lokomotiv Moscow,FK Krylya Sovetov Samara,2,1,H,1.42,4.53,9.95,1.43,4.75,12,1.38,4.36,8.42
Russia,Premier League,2013/2014,10/03/2014,15:00,FK Rostov,Kuban,0,0,D,2.77,3.1,2.91,2.77,3.2,2.98,2.66,3.02,2.71
Russia,Premier League,2013/2014,14/03/2014,13:00,Ural,Akhmat Grozny,2,1,H,3.22,3.21,2.47,3.45,3.21,2.55,3.02,3.08,2.38
Russia,Premier League,2013/2014,15/03/2014,09:30,FK Krylya Sovetov Samara,FK Rostov,0,2,A,2.87,3.12,2.81,2.98,3.2,2.81,2.71,3.03,2.65
Russia,Premier League,2013/2014,15/03/2014,12:00,CSKA Moscow,Zenit,1,0,H,2.46,3.38,3.11,2.6,3.4,3.2,2.39,3.21,2.9
Russia,Premier League,2013/2014,15/03/2014,14:30,Kuban,Dynamo Moscow,1,1,D,3.15,3.21,2.52,3.7,3.45,2.52,3.19,3.15,2.26
Russia,Premier League,2013/2014,16/03/2014,09:30,Amkar,Lokomotiv Moscow,0,0,D,3.42,3.25,2.35,3.75,3.4,2.4,3.32,3.17,2.19
Russia,Premier League,2013/2014,16/03/2014,14:00,Rubin Kazan,Volga N. Novgorod,3,1,H,1.55,4.29,6.79,1.6,4.3,7.5,1.55,3.83,6.04
Russia,Premier League,2013/2014,17/03/2014,12:30,Tomsk,Krasnodar,1,1,D,3.88,3.28,2.14,4.33,3.55,2.2,3.67,3.15,2.06
Russia,Premier League,2013/2014,17/03/2014,15:00,Spartak Moscow,FK Anzi Makhackala,2,2,D,1.69,3.86,5.72,1.71,4,6.5,1.61,3.71,5.42
Russia,Premier League,2013/2014,21/03/2014,15:00,FK Rostov,Amkar,3,3,D,2.37,3.23,3.4,2.5,3.23,3.65,2.32,3.07,3.15
Russia,Premier League,2013/2014,22/03/2014,10:00,Volga N. Novgorod,Tomsk,0,1,A,2.91,3.18,2.73,3,3.25,3.1,2.65,3.07,2.7
Russia,Premier League,2013/2014,22/03/2014,12:30,Lokomotiv Moscow,Ural,3,0,H,1.4,4.82,9.63,1.43,4.9,12,1.38,4.35,8.48
Russia,Premier League,2013/2014,22/03/2014,15:00,Krasnodar,Spartak Moscow,4,0,H,2.56,3.29,3.03,2.8,3.3,3.05,2.49,3.18,2.78
Russia,Premier League,2013/2014,23/03/2014,09:30,Dynamo Moscow,Rubin Kazan,0,0,D,1.75,3.66,5.58,1.75,3.8,6.4,1.71,3.5,4.94
Russia,Premier League,2013/2014,23/03/2014,14:30,Akhmat Grozny,Kuban,2,1,H,2.64,3.16,3.03,2.7,3.25,3.1,2.56,3.05,2.8
Russia,Premier League,2013/2014,24/03/2014,13:00,FK Anzi Makhackala,CSKA Moscow,0,3,A,4.01,3.28,2.13,4.15,3.5,2.3,3.47,3.18,2.13
Russia,Premier League,2013/2014,24/03/2014,15:00,Zenit,FK Krylya Sovetov Samara,2,1,H,1.28,5.5,15.4,1.35,6.3,16,1.27,5.28,10.94
Russia,Premier League,2013/2014,29/03/2014,09:30,Ural,FK Anzi Makhackala,2,1,H,2.87,3.17,2.77,3.2,3.35,2.77,2.89,3.04,2.51
Russia,Premier League,2013/2014,29/03/2014,12:00,Amkar,Zenit,1,2,A,3.67,3.27,2.23,4.4,3.5,2.27,3.61,3.21,2.08
Russia,Premier League,2013/2014,30/03/2014,10:30,Lokomotiv Moscow,Spartak Moscow,0,0,D,1.93,3.76,4.13,2,3.95,4.25,1.88,3.49,3.93
Russia,Premier League,2013/2014,30/03/2014,12:45,Tomsk,Dynamo Moscow,1,3,A,5.31,3.31,1.87,5.5,3.5,1.87,4.66,3.31,1.8
Russia,Premier League,2013/2014,30/03/2014,15:00,Rubin Kazan,FK Rostov,1,2,A,2,3.38,4.36,2,3.6,5,1.87,3.26,4.31
Russia,Premier League,2013/2014,30/03/2014,17:15,Kuban,Krasnodar,1,3,A,3.02,3.37,2.52,3.15,3.45,2.65,2.79,3.14,2.52
Russia,Premier League,2013/2014,31/03/2014,17:45,CSKA Moscow,Volga N. Novgorod,3,0,H,1.2,7.05,19.15,1.25,8,26,1.2,6.19,13.68
Russia,Premier League,2013/2014,04/04/2014,15:15,Kuban,Tomsk,2,0,H,1.83,3.51,5.18,1.9,3.55,5.3,1.79,3.4,4.56
Russia,Premier League,2013/2014,04/04/2014,17:30,Spartak Moscow,Ural,0,1,A,1.45,4.54,8.45,1.5,4.95,9.6,1.43,4.21,7.25
Russia,Premier League,2013/2014,05/04/2014,11:00,Amkar,Akhmat Grozny,0,1,A,2.05,3.22,4.43,2.1,3.3,4.6,2.01,3.17,3.82
Russia,Premier League,2013/2014,05/04/2014,13:30,FK Krylya Sovetov Samara,CSKA Moscow,1,3,A,6.84,3.8,1.63,7.4,3.95,1.7,5.64,3.57,1.62
Russia,Premier League,2013/2014,06/04/2014,10:30,Zenit,Rubin Kazan,6,2,H,1.53,4.3,7.25,1.53,4.55,9.2,1.48,4,6.8
Russia,Premier League,2013/2014,06/04/2014,13:00,FK Anzi Makhackala,Dynamo Moscow,4,0,H,4.55,3.57,1.9,4.75,3.7,2.05,4.07,3.38,1.88
Russia,Premier League,2013/2014,06/04/2014,15:30,Krasnodar,FK Rostov,0,2,A,1.61,4.02,6.45,1.7,4.1,6.8,1.6,3.69,5.72
Russia,Premier League,2013/2014,07/04/2014,16:00,Lokomotiv Moscow,Volga N. Novgorod,3,0,H,1.2,6.78,18.78,1.22,7.4,19,1.19,6.36,13.29
Russia,Premier League,2013/2014,08/04/2014,16:00,FK Krylya Sovetov Samara,Akhmat Grozny,1,1,D,3.27,2.91,2.65,3.55,2.91,2.71,3.06,2.8,2.55
Russia,Premier League,2013/2014,11/04/2014,16:30,Spartak Moscow,FK Krylya Sovetov Samara,1,0,H,1.63,4.19,5.81,1.63,4.4,6.55,1.57,3.81,5.8
Russia,Premier League,2013/2014,12/04/2014,09:00,Tomsk,Amkar,0,0,D,2.55,3.02,3.32,2.6,3.45,3.32,2.46,3.01,2.97
Russia,Premier League,2013/2014,12/04/2014,11:30,CSKA Moscow,Ural,1,0,H,1.36,5.32,9.96,1.36,5.6,13,1.33,4.79,8.95
Russia,Premier League,2013/2014,12/04/2014,14:00,Akhmat Grozny,FK Rostov,3,0,H,2.07,3.35,4.24,2.15,3.5,4.24,2.05,3.14,3.72
Russia,Premier League,2013/2014,12/04/2014,16:30,Zenit,Krasnodar,4,1,H,1.49,4.7,7.04,1.51,4.9,8.9,1.46,4.2,6.67
Russia,Premier League,2013/2014,13/04/2014,10:30,Lokomotiv Moscow,FK Anzi Makhackala,0,0,D,1.58,4.24,6.32,1.58,4.55,7.7,1.48,4,6.77
Russia,Premier League,2013/2014,13/04/2014,13:00,Rubin Kazan,Kuban,0,2,A,2.33,3.15,3.56,2.35,3.3,3.8,2.19,3.12,3.36
Russia,Premier League,2013/2014,14/04/2014,16:00,Volga N. Novgorod,Dynamo Moscow,0,5,A,8.32,4.66,1.45,9.2,5.2,1.45,7.48,4.26,1.41
Russia,Premier League,2013/2014,18/04/2014,14:00,Amkar,Ural,0,2,A,2.21,3.44,3.55,2.3,3.5,3.6,2.18,3.26,3.22
Russia,Premier League,2013/2014,19/04/2014,10:00,Tomsk,FK Krylya Sovetov Samara,2,0,H,2.37,3.12,3.55,2.48,3.12,3.55,2.29,2.99,3.28
Russia,Premier League,2013/2014,19/04/2014,12:30,Lokomotiv Moscow,Akhmat Grozny,2,1,H,1.53,4.22,7.41,1.59,4.35,8.1,1.53,3.87,6.19
Russia,Premier League,2013/2014,19/04/2014,15:00,FK Anzi Makhackala,Zenit,1,2,A,5.95,4.17,1.63,6.5,4.3,1.65,5.52,3.79,1.59
Russia,Premier League,2013/2014,20/04/2014,10:30,Rubin Kazan,Spartak Moscow,2,1,H,2.41,3.24,3.31,2.7,3.35,3.31,2.45,3.13,2.91
Russia,Premier League,2013/2014,20/04/2014,13:00,Dynamo Moscow,Krasnodar,1,2,A,1.7,3.89,5.52,1.8,4,5.52,1.67,3.65,5
Russia,Premier League,2013/2014,20/04/2014,15:30,Kuban,CSKA Moscow,0,4,A,5.25,3.78,1.76,5.5,3.78,1.85,4.72,3.51,1.74
Russia,Premier League,2013/2014,21/04/2014,16:00,Volga N. Novgorod,FK Rostov,2,1,H,3.73,3.41,2.16,4,3.8,2.2,3.67,3.34,1.99
Russia,Premier League,2013/2014,25/04/2014,16:00,FK Krylya Sovetov Samara,Amkar,2,2,D,1.96,3.44,4.45,1.96,3.65,4.75,1.89,3.31,4.09
Russia,Premier League,2013/2014,26/04/2014,11:00,Ural,Tomsk,0,0,D,2.37,3.12,3.53,2.37,3.3,3.85,2.21,3.06,3.4
Russia,Premier League,2013/2014,26/04/2014,13:30,Zenit,Volga N. Novgorod,2,0,H,1.14,9.35,23,1.16,10.5,29,1.13,7.79,18.27
Russia,Premier League,2013/2014,26/04/2014,16:00,Krasnodar,Lokomotiv Moscow,1,3,A,3.13,3.36,2.46,3.3,3.45,2.46,3,3.27,2.3
Russia,Premier League,2013/2014,27/04/2014,10:30,CSKA Moscow,Rubin Kazan,2,1,H,1.54,4.18,7.3,1.54,4.6,8.8,1.48,4.07,6.59
Russia,Premier League,2013/2014,27/04/2014,13:00,FK Rostov,FK Anzi Makhackala,1,1,D,3.41,3.41,2.28,3.65,3.6,2.3,3.24,3.2,2.2
Russia,Premier League,2013/2014,27/04/2014,15:30,Akhmat Grozny,Dynamo Moscow,1,0,H,3.44,3.11,2.41,3.45,3.35,2.42,3.19,3.12,2.26
Russia,Premier League,2013/2014,28/04/2014,17:30,Spartak Moscow,Kuban,0,2,A,1.56,4.07,7.16,1.65,4.35,7.5,1.55,3.82,6.07
Russia,Premier League,2013/2014,02/05/2014,11:00,Amkar,CSKA Moscow,1,3,A,7.76,4.33,1.5,8.8,4.6,1.52,7.2,4.02,1.46
Russia,Premier League,2013/2014,02/05/2014,13:30,Volga N. Novgorod,Krasnodar,0,1,A,5.33,3.98,1.71,5.6,4,1.75,4.68,3.64,1.71
Russia,Premier League,2013/2014,02/05/2014,16:00,FK Rostov,Dynamo Moscow,2,3,A,4.62,3.91,1.81,5.3,3.91,1.83,4.52,3.52,1.76
Russia,Premier League,2013/2014,03/05/2014,11:00,Tomsk,Spartak Moscow,2,1,H,3.43,3.32,2.32,3.6,3.5,2.35,3.34,3.19,2.17
Russia,Premier League,2013/2014,03/05/2014,16:00,Kuban,FK Krylya Sovetov Samara,4,0,H,2,3.45,4.2,2.01,3.5,4.55,1.9,3.32,4.06
Russia,Premier League,2013/2014,04/05/2014,10:30,Lokomotiv Moscow,Zenit,1,1,D,3.45,3.35,2.29,3.5,3.6,2.31,3.16,3.23,2.22
Russia,Premier League,2013/2014,04/05/2014,13:30,Rubin Kazan,Ural,1,0,H,1.76,3.62,5.59,1.8,3.62,5.8,1.74,3.46,4.75
Russia,Premier League,2013/2014,04/05/2014,16:00,FK Anzi Makhackala,Akhmat Grozny,3,0,H,2.48,3.48,2.98,2.48,3.55,3.3,2.31,3.19,3.05
Russia,Premier League,2013/2014,10/05/2014,10:00,Ural,Kuban,2,1,H,2.53,3.51,2.89,2.6,3.51,3,2.43,3.2,2.83
Russia,Premier League,2013/2014,10/05/2014,12:15,FK Krylya Sovetov Samara,Rubin Kazan,0,4,A,2.95,3.35,2.59,3.3,3.55,2.59,2.87,3.18,2.42
Russia,Premier League,2013/2014,10/05/2014,14:45,Spartak Moscow,Amkar,1,0,H,1.53,4.26,7.25,1.53,4.65,7.25,1.5,4.02,6.27
Russia,Premier League,2013/2014,10/05/2014,17:00,Akhmat Grozny,Volga N. Novgorod,2,0,H,1.43,4.63,9.15,1.45,5.1,11,1.4,4.36,7.7
Russia,Premier League,2013/2014,11/05/2014,10:30,Zenit,Dynamo Moscow,0,3,A,1.48,4.72,7.2,1.55,5.1,7.6,1.47,4.22,6.35
Russia,Premier League,2013/2014,11/05/2014,12:45,CSKA Moscow,Tomsk,2,0,H,1.29,6.11,11.8,1.3,6.6,16,1.25,5.67,10.76
Russia,Premier League,2013/2014,11/05/2014,15:00,Krasnodar,FK Anzi Makhackala,1,0,H,2.33,3.93,2.91,2.36,4.15,3.1,2.25,3.56,2.85
Russia,Premier League,2013/2014,11/05/2014,17:15,FK Rostov,Lokomotiv Moscow,2,0,H,9.04,5.15,1.39,11,5.5,1.39,8.5,4.81,1.33
Russia,Premier League,2013/2014,15/05/2014,15:30,Amkar,Krasnodar,2,2,D,4.14,3.63,1.96,4.8,3.85,2.02,4,3.45,1.88
Russia,Premier League,2013/2014,15/05/2014,15:30,CSKA Moscow,Lokomotiv Moscow,1,0,H,1.78,4.1,4.56,1.8,4.25,4.76,1.73,3.76,4.41
Russia,Premier League,2013/2014,15/05/2014,15:30,FK Anzi Makhackala,FK Krylya Sovetov Samara,0,1,A,1.77,3.88,4.97,1.83,3.9,5,1.75,3.57,4.5
Russia,Premier League,2013/2014,15/05/2014,15:30,Kuban,Zenit,1,4,A,7.06,4.85,1.48,7.3,5.1,1.51,6.36,4.49,1.44
Russia,Premier League,2013/2014,15/05/2014,15:30,Rubin Kazan,Akhmat Grozny,1,1,D,1.9,3.84,4.18,1.96,3.84,4.3,1.87,3.45,4.01
Russia,Premier League,2013/2014,15/05/2014,15:30,Spartak Moscow,Dynamo Moscow,3,2,H,2.62,3.54,2.77,3,3.7,2.77,2.59,3.33,2.58
Russia,Premier League,2013/2014,15/05/2014,15:30,Tomsk,FK Rostov,3,2,H,2.25,3.41,3.49,2.45,3.55,3.49,2.28,3.21,3.09
Russia,Premier League,2013/2014,15/05/2014,15:30,Volga N. Novgorod,Ural,1,2,A,3.42,3.43,2.26,3.43,3.45,2.33,3.19,3.24,2.21
Russia,Premier League,2013/2014,18/05/2014,12:00,Ufa,Tomsk,5,1,H,3.93,3.27,2.12,3.93,3.4,2.15,3.45,3.21,2.07
Russia,Premier League,2013/2014,18/05/2014,16:00,T. Moscow,FK Krylya Sovetov Samara,2,0,H,2.55,3.22,3.1,2.6,3.22,3.1,2.43,3.09,2.86
Russia,Premier League,2013/2014,22/05/2014,13:00,Tomsk,Ufa,3,1,H,1.84,4.05,4.28,1.84,4.05,5.1,1.73,3.85,4.25
Russia,Premier League,2013/2014,22/05/2014,16:00,FK Krylya Sovetov Samara,T. Moscow,0,0,D,2.29,3.34,3.47,2.4,3.4,4,2.14,3.21,3.39
Russia,Premier League,2014/2015,01/08/2014,17:00,Rubin Kazan,Spartak Moscow,0,4,A,2.58,3.25,3.03,2.7,3.25,3.1,2.52,3.11,2.8
Russia,Premier League,2014/2015,02/08/2014,13:30,Ural,M. Saransk,2,3,A,2.15,3.31,3.85,2.3,3.31,3.9,2.12,3.15,3.5
Russia,Premier League,2014/2015,02/08/2014,16:00,Arsenal Tula,Zenit,0,4,A,8.13,4.31,1.49,8.13,4.35,1.57,6.67,3.93,1.5
Russia,Premier League,2014/2015,02/08/2014,18:30,CSKA Moscow,T. Moscow,4,1,H,1.34,5.05,12,1.37,5.4,12.36,1.32,4.77,9.59
Russia,Premier League,2014/2015,03/08/2014,13:30,Dynamo Moscow,FK Rostov,7,3,H,1.5,4.29,7.95,1.6,4.4,7.99,1.49,3.88,6.81
Russia,Premier League,2014/2015,03/08/2014,16:30,Kuban,Ufa,2,0,H,1.45,4.35,9.23,1.5,4.75,9.5,1.44,4.05,7.56
Russia,Premier League,2014/2015,03/08/2014,18:30,Lokomotiv Moscow,Krasnodar,0,0,D,2.11,3.5,3.76,2.24,3.5,3.76,2.06,3.29,3.52
Russia,Premier League,2014/2015,04/08/2014,17:00,Akhmat Grozny,Amkar,4,0,H,1.75,3.67,5.5,1.75,3.75,5.8,1.7,3.45,5.06
Russia,Premier League,2014/2015,08/08/2014,15:00,Amkar,Ufa,0,1,A,1.87,3.48,4.94,2.03,3.48,4.94,1.9,3.31,4.06
Russia,Premier League,2014/2015,08/08/2014,17:30,Kuban,FK Rostov,2,2,D,1.78,3.79,4.9,1.83,3.8,5,1.73,3.54,4.63
Russia,Premier League,2014/2015,09/08/2014,10:30,M. Saransk,CSKA Moscow,0,1,A,7.04,4.37,1.53,7.7,4.65,1.62,6.21,3.95,1.51
Russia,Premier League,2014/2015,09/08/2014,14:00,Zenit,T. Moscow,8,1,H,1.22,6.75,17,1.22,7.8,19,1.19,6.33,13.53
Russia,Premier League,2014/2015,09/08/2014,17:00,Akhmat Grozny,Rubin Kazan,1,1,D,2.09,3.35,4.03,2.17,3.5,4.55,2.07,3.23,3.55
Russia,Premier League,2014/2015,10/08/2014,10:30,Dynamo Moscow,Spartak Moscow,1,2,A,2.44,3.38,3.13,2.64,3.4,3.13,2.37,3.28,2.86
Russia,Premier League,2014/2015,10/08/2014,13:30,Ural,Krasnodar,1,1,D,4.35,3.67,1.92,5,3.7,1.95,3.98,3.41,1.88
Russia,Premier League,2014/2015,10/08/2014,16:30,Arsenal Tula,Lokomotiv Moscow,0,2,A,6.3,4.21,1.59,7.1,4.5,1.62,5.9,3.89,1.54
Russia,Premier League,2014/2015,12/08/2014,17:00,T. Moscow,Amkar,1,1,D,3.06,3.26,2.57,3.1,3.26,2.7,2.84,3.07,2.5
Russia,Premier League,2014/2015,13/08/2014,12:00,Ufa,Dynamo Moscow,0,2,A,8.5,4.67,1.44,10,5.1,1.44,7.58,4.38,1.4
Russia,Premier League,2014/2015,13/08/2014,14:30,Ural,Zenit,1,2,A,8.34,5.18,1.4,9.9,5.6,1.43,7.41,4.6,1.38
Russia,Premier League,2014/2015,13/08/2014,17:00,Arsenal Tula,Rubin Kazan,0,0,D,3.95,3.45,2.07,4.2,3.45,2.15,3.62,3.23,2.04
Russia,Premier League,2014/2015,13/08/2014,17:00,CSKA Moscow,Akhmat Grozny,1,0,H,1.56,4.25,6.82,1.58,4.3,7.7,1.5,3.92,6.49
Russia,Premier League,2014/2015,14/08/2014,15:30,Lokomotiv Moscow,FK Rostov,2,1,H,1.51,4.26,7.75,1.51,4.5,8.8,1.44,4.18,7.05
Russia,Premier League,2014/2015,14/08/2014,18:00,Krasnodar,Spartak Moscow,4,0,H,2.4,3.25,2.97,2.7,3.55,3.13,2.42,3.22,2.85
Russia,Premier League,2014/2015,15/08/2014,17:00,M. Saransk,Kuban,0,0,D,2.9,3.24,2.69,2.95,3.4,2.69,2.83,3.1,2.5
Russia,Premier League,2014/2015,16/08/2014,14:00,Ural,T. Moscow,0,2,A,1.66,3.87,6.03,1.73,4,6.4,1.67,3.62,5.05
Russia,Premier League,2014/2015,16/08/2014,17:00,Zenit,Ufa,1,0,H,1.18,8.92,16.07,1.18,9.4,21,1.16,7.06,15.35
Russia,Premier League,2014/2015,17/08/2014,10:30,CSKA Moscow,Spartak Moscow,0,1,A,1.98,3.76,3.92,2,3.95,4.65,1.92,3.45,3.77
Russia,Premier League,2014/2015,17/08/2014,13:00,Arsenal Tula,Dynamo Moscow,1,2,A,7.85,4.8,1.45,9.2,5.2,1.45,6.97,4.44,1.42
Russia,Premier League,2014/2015,17/08/2014,15:30,Rubin Kazan,Lokomotiv Moscow,1,1,D,3.07,3.22,2.57,3.2,3.27,2.6,2.87,3.11,2.47
Russia,Premier League,2014/2015,17/08/2014,18:00,FK Rostov,Krasnodar,0,2,A,3.91,3.55,2.05,4.15,3.65,2.15,3.45,3.38,2.05
Russia,Premier League,2014/2015,18/08/2014,17:00,Akhmat Grozny,M. Saransk,1,0,H,1.61,3.9,6.53,1.64,4.1,6.6,1.59,3.62,5.72
Russia,Premier League,2014/2015,18/08/2014,18:00,Kuban,Amkar,1,0,H,1.5,4.2,8.19,1.6,4.33,8.4,1.51,3.89,6.4
Russia,Premier League,2014/2015,22/08/2014,17:00,Akhmat Grozny,Arsenal Tula,3,0,H,1.51,4.44,7.24,1.53,4.44,8,1.47,4.05,6.79
Russia,Premier League,2014/2015,23/08/2014,11:00,Ufa,Spartak Moscow,1,2,A,5.32,4.02,1.69,7.5,4.33,1.7,5.72,3.94,1.55
Russia,Premier League,2014/2015,23/08/2014,14:00,Zenit,Amkar,2,0,H,1.24,7,13.1,1.27,7.27,16.26,1.23,5.96,10.92
Russia,Premier League,2014/2015,23/08/2014,17:00,Rubin Kazan,CSKA Moscow,2,1,H,3.45,3.22,2.35,3.45,3.3,2.42,3.13,3.14,2.27
Russia,Premier League,2014/2015,24/08/2014,10:30,Dynamo Moscow,Ural,2,0,H,1.36,5.03,10.61,1.37,5.1,10.61,1.34,4.82,8.29
Russia,Premier League,2014/2015,24/08/2014,13:30,T. Moscow,Krasnodar,0,3,A,4.74,3.94,1.79,5.4,3.94,1.8,4.55,3.53,1.74
Russia,Premier League,2014/2015,24/08/2014,16:30,Kuban,Lokomotiv Moscow,2,1,H,2.57,3.21,3.08,2.8,3.3,3.08,2.55,3.07,2.76
Russia,Premier League,2014/2015,24/08/2014,18:30,FK Rostov,M. Saransk,2,1,H,2.34,3.26,3.45,2.45,3.3,3.45,2.3,3.13,3.09
Russia,Premier League,2014/2015,29/08/2014,15:00,Ural,Akhmat Grozny,0,1,A,3.34,3.25,2.39,3.55,3.25,2.46,3.16,3.09,2.29
Russia,Premier League,2014/2015,30/08/2014,11:00,M. Saransk,T. Moscow,1,0,H,1.99,3.4,4.38,2.01,3.4,5.3,1.89,3.27,4.14
Russia,Premier League,2014/2015,30/08/2014,14:00,Amkar,Spartak Moscow,2,0,H,5.26,3.79,1.75,6,3.85,1.79,4.89,3.53,1.7
Russia,Premier League,2014/2015,30/08/2014,17:00,Arsenal Tula,Kuban,0,1,A,4.67,3.65,1.86,5.2,3.65,1.95,4.34,3.41,1.81
Russia,Premier League,2014/2015,31/08/2014,10:30,CSKA Moscow,FK Rostov,6,0,H,1.48,4.46,7.98,1.5,5,10.45,1.38,4.5,7.85
Russia,Premier League,2014/2015,31/08/2014,13:00,Rubin Kazan,Ufa,1,1,D,1.56,4.18,6.8,1.57,4.45,8,1.5,3.94,6.4
Russia,Premier League,2014/2015,31/08/2014,15:00,Lokomotiv Moscow,Zenit,0,1,A,4.3,3.53,1.96,5.7,3.85,2.02,4.28,3.43,1.82
Russia,Premier League,2014/2015,31/08/2014,17:15,Krasnodar,Dynamo Moscow,0,2,A,2.7,3.33,2.82,2.7,3.46,3.05,2.49,3.23,2.74
Russia,Premier League,2014/2015,13/09/2014,10:30,CSKA Moscow,Arsenal Tula,2,1,H,1.21,6.96,18.99,1.22,8.3,23,1.19,6.38,13.5
Russia,Premier League,2014/2015,13/09/2014,13:00,Lokomotiv Moscow,M. Saransk,1,1,D,1.49,4.32,8.06,1.6,4.32,8.06,1.5,3.89,6.67
Russia,Premier League,2014/2015,13/09/2014,15:30,Zenit,Dynamo Moscow,3,2,H,2.03,3.7,3.8,2.2,3.8,4,1.95,3.44,3.68
Russia,Premier League,2014/2015,13/09/2014,18:00,FK Rostov,Rubin Kazan,1,2,A,3.2,3.35,2.41,3.6,3.35,2.41,3.12,3.13,2.29
Russia,Premier League,2014/2015,14/09/2014,10:30,Spartak Moscow,T. Moscow,3,1,H,1.4,5.05,9,1.4,6,13,1.33,4.9,8.75
Russia,Premier League,2014/2015,14/09/2014,16:00,Krasnodar,Ufa,0,2,A,1.38,4.96,10.63,1.45,5.4,13,1.37,4.38,8.71
Russia,Premier League,2014/2015,15/09/2014,14:00,Amkar,Ural,2,1,H,2.21,3.3,3.71,2.32,3.4,3.8,2.15,3.16,3.4
Russia,Premier League,2014/2015,15/09/2014,17:00,Akhmat Grozny,Kuban,0,0,D,2.24,3.33,3.59,2.35,3.33,3.59,2.2,3.15,3.31
Russia,Premier League,2014/2015,19/09/2014,17:00,Arsenal Tula,M. Saransk,0,1,A,2.89,3.24,2.71,3.08,3.24,2.85,2.79,3.04,2.57
Russia,Premier League,2014/2015,20/09/2014,09:00,Ufa,Ural,0,1,A,2.43,3.17,3.36,2.5,3.25,3.5,2.39,3.04,3.05
Russia,Premier League,2014/2015,20/09/2014,11:30,FK Rostov,Zenit,0,5,A,8.42,5.09,1.41,9,5.5,1.45,7.72,4.54,1.38
Russia,Premier League,2014/2015,20/09/2014,14:00,Kuban,Rubin Kazan,2,1,H,2.37,3.31,3.29,2.41,3.4,3.49,2.22,3.16,3.24
Russia,Premier League,2014/2015,20/09/2014,17:00,Spartak Moscow,Akhmat Grozny,1,1,D,1.95,3.54,4.3,2.02,3.75,5.07,1.88,3.37,4.1
Russia,Premier League,2014/2015,21/09/2014,10:30,CSKA Moscow,Lokomotiv Moscow,1,0,H,1.75,3.83,5.17,1.83,3.83,5.41,1.74,3.49,4.73
Russia,Premier League,2014/2015,22/09/2014,14:00,Amkar,Krasnodar,1,2,A,3.62,3.33,2.22,3.96,3.6,2.28,3.35,3.2,2.15
Russia,Premier League,2014/2015,22/09/2014,17:00,T. Moscow,Dynamo Moscow,1,3,A,7.34,5,1.45,10.25,5.2,1.45,7.23,4.49,1.4
Russia,Premier League,2014/2015,27/09/2014,10:30,Ural,CSKA Moscow,3,4,A,5.47,4.01,1.68,6.5,4.15,1.73,5.3,3.7,1.63
Russia,Premier League,2014/2015,27/09/2014,13:00,M. Saransk,Ufa,0,2,A,2.06,3.38,4.1,2.07,3.45,4.4,1.98,3.29,3.78
Russia,Premier League,2014/2015,27/09/2014,15:30,Zenit,Spartak Moscow,0,0,D,1.58,4.36,6.15,1.62,4.75,6.4,1.55,4.03,5.52
Russia,Premier League,2014/2015,28/09/2014,10:30,Dynamo Moscow,Kuban,2,2,D,1.74,3.82,5.3,1.76,4,5.8,1.68,3.59,4.95
Russia,Premier League,2014/2015,28/09/2014,13:00,Lokomotiv Moscow,Amkar,3,1,H,1.5,4.4,7.82,1.55,4.45,7.82,1.5,3.96,6.52
Russia,Premier League,2014/2015,28/09/2014,15:30,Krasnodar,Arsenal Tula,3,0,H,1.33,5.5,11,1.35,6.3,12,1.3,5.12,9.45
Russia,Premier League,2014/2015,28/09/2014,18:00,Akhmat Grozny,FK Rostov,2,1,H,1.49,4.59,7.38,1.5,4.75,8.05,1.44,4.16,7.14
Russia,Premier League,2014/2015,29/09/2014,17:00,Rubin Kazan,T. Moscow,2,1,H,1.53,4.52,6.61,1.53,4.65,8,1.47,4.1,6.58
Russia,Premier League,2014/2015,18/10/2014,11:30,CSKA Moscow,Kuban,6,0,H,1.81,3.6,5.19,1.85,3.7,5.6,1.73,3.44,4.85
Russia,Premier League,2014/2015,18/10/2014,14:00,Krasnodar,Zenit,2,2,D,3.47,3.48,2.22,4,3.5,2.28,3.47,3.29,2.08
Russia,Premier League,2014/2015,18/10/2014,16:30,Lokomotiv Moscow,Akhmat Grozny,2,1,H,2.28,3.39,3.37,3,3.7,3.37,2.41,3.32,2.79
Russia,Premier League,2014/2015,19/10/2014,10:30,Ural,Spartak Moscow,2,0,H,4.08,3.54,2.01,4.4,3.6,2.01,3.95,3.32,1.91
Russia,Premier League,2014/2015,19/10/2014,13:30,Arsenal Tula,FK Rostov,1,1,D,2.97,3.38,2.54,3.08,3.38,2.6,2.88,3.19,2.41
Russia,Premier League,2014/2015,20/10/2014,14:00,Ufa,T. Moscow,1,1,D,2.3,3.3,3.51,2.31,3.35,3.75,2.16,3.17,3.36
Russia,Premier League,2014/2015,20/10/2014,16:30,Rubin Kazan,M. Saransk,5,0,H,1.58,4.02,6.96,1.67,4.02,6.96,1.56,3.71,5.99
Russia,Premier League,2014/2015,24/10/2014,14:00,Ural,Arsenal Tula,1,0,H,1.74,3.74,5.44,1.74,3.85,6.8,1.66,3.62,5.13
Russia,Premier League,2014/2015,25/10/2014,11:00,Amkar,FK Rostov,2,0,H,2.49,3.23,3.2,2.49,3.35,3.5,2.26,3.15,3.18
Russia,Premier League,2014/2015,25/10/2014,14:00,T. Moscow,Kuban,0,0,D,4.4,3.53,1.94,4.5,3.65,2.18,3.83,3.34,1.95
Russia,Premier League,2014/2015,26/10/2014,10:30,Spartak Moscow,Lokomotiv Moscow,1,1,D,2.45,3.37,3.12,2.51,3.5,3.3,2.37,3.21,2.93
Russia,Premier League,2014/2015,26/10/2014,10:30,Ufa,CSKA Moscow,3,3,D,8.5,4.74,1.43,9.7,4.85,1.5,7.25,4.28,1.43
Russia,Premier League,2014/2015,26/10/2014,16:00,Zenit,M. Saransk,5,0,H,1.17,7.9,20.64,1.2,8.7,26,1.15,7.12,17.87
Russia,Premier League,2014/2015,27/10/2014,15:45,Krasnodar,Akhmat Grozny,2,0,H,2.02,3.33,4.34,2.05,3.6,5.1,1.94,3.3,3.93
Russia,Premier League,2014/2015,27/10/2014,17:30,Dynamo Moscow,Rubin Kazan,0,2,A,1.7,3.89,5.51,1.75,4.1,7,1.65,3.63,5.17
Russia,Premier League,2014/2015,31/10/2014,16:00,FK Rostov,Ural,1,0,H,2.37,3.25,3.39,2.46,3.3,3.39,2.25,3.15,3.2
Russia,Premier League,2014/2015,01/11/2014,13:00,CSKA Moscow,Zenit,0,1,A,2.58,3.32,2.95,2.8,3.35,2.95,2.59,3.18,2.68
Russia,Premier League,2014/2015,02/11/2014,10:30,Lokomotiv Moscow,Dynamo Moscow,4,2,H,3.2,3.41,2.39,3.3,3.41,2.45,3.03,3.18,2.33
Russia,Premier League,2014/2015,02/11/2014,13:30,M. Saransk,Krasnodar,2,1,H,4.81,3.85,1.79,5.2,3.85,1.85,4.5,3.48,1.77
Russia,Premier League,2014/2015,02/11/2014,16:00,Kuban,Spartak Moscow,3,3,D,2.25,3.37,3.51,2.4,3.37,3.51,2.23,3.17,3.23
Russia,Premier League,2014/2015,03/11/2014,11:00,T. Moscow,Arsenal Tula,0,1,A,2.18,3.29,3.81,2.21,3.4,4,2.07,3.22,3.56
Russia,Premier League,2014/2015,03/11/2014,13:30,Rubin Kazan,Amkar,1,1,D,1.55,4.05,7.48,1.57,4.2,7.64,1.53,3.78,6.5
Russia,Premier League,2014/2015,03/11/2014,16:00,Akhmat Grozny,Ufa,1,0,H,1.52,4.15,7.97,1.53,4.55,8.8,1.46,3.96,7.35
Russia,Premier League,2014/2015,07/11/2014,14:00,Ural,Kuban,0,1,A,3.4,3.17,2.41,3.6,3.35,2.45,3.14,3.11,2.3
Russia,Premier League,2014/2015,08/11/2014,10:00,Amkar,M. Saransk,0,1,A,2.11,3.4,3.9,2.16,3.4,4,2.04,3.21,3.66
Russia,Premier League,2014/2015,08/11/2014,13:00,T. Moscow,Lokomotiv Moscow,0,1,A,5.37,3.65,1.78,5.9,3.85,1.8,4.85,3.48,1.72
Russia,Premier League,2014/2015,08/11/2014,16:00,Zenit,Akhmat Grozny,1,3,A,1.54,4.29,6.95,1.54,4.7,7.9,1.48,4.07,6.66
Russia,Premier League,2014/2015,09/11/2014,10:30,Dynamo Moscow,CSKA Moscow,1,0,H,3.05,3.45,2.46,3.15,3.55,2.62,2.82,3.26,2.43
Russia,Premier League,2014/2015,09/11/2014,12:00,Ufa,FK Rostov,0,0,D,2.96,3.24,2.64,3.05,3.3,2.7,2.78,3.1,2.55
Russia,Premier League,2014/2015,09/11/2014,12:45,Krasnodar,Rubin Kazan,2,0,H,2.16,3.31,3.79,2.32,3.31,3.8,2.11,3.19,3.5
Russia,Premier League,2014/2015,09/11/2014,15:00,Spartak Moscow,Arsenal Tula,2,0,H,1.44,4.78,8.35,1.44,5.2,9,1.39,4.41,7.93
Russia,Premier League,2014/2015,22/11/2014,09:00,Ural,Rubin Kazan,1,3,A,4.1,3.32,2.08,4.1,3.32,2.15,3.69,3.17,2.05
Russia,Premier League,2014/2015,22/11/2014,11:15,T. Moscow,FK Rostov,2,1,H,2.7,3.21,2.91,2.76,3.25,2.91,2.59,3.07,2.75
Russia,Premier League,2014/2015,22/11/2014,13:30,Krasnodar,CSKA Moscow,2,1,H,2.7,3.24,2.88,2.88,3.3,2.88,2.64,3.13,2.64
Russia,Premier League,2014/2015,22/11/2014,16:00,Zenit,Kuban,1,0,H,1.53,4.25,7.47,1.53,4.5,8.5,1.48,3.93,6.94
Russia,Premier League,2014/2015,23/11/2014,10:30,Dynamo Moscow,Akhmat Grozny,3,0,H,2.06,3.42,3.99,2.06,3.45,4.25,1.99,3.23,3.81
Russia,Premier League,2014/2015,23/11/2014,13:00,Arsenal Tula,Amkar,4,0,H,2.38,3.21,3.4,2.7,3.3,3.4,2.41,3.08,2.97
Russia,Premier League,2014/2015,23/11/2014,15:30,Spartak Moscow,M. Saransk,4,2,H,1.51,4.42,7.47,1.51,4.65,8.8,1.45,4.05,7.31
Russia,Premier League,2014/2015,24/11/2014,16:00,Lokomotiv Moscow,Ufa,0,0,D,1.47,4.37,8.59,1.47,4.55,10.5,1.42,4.16,7.82
Russia,Premier League,2014/2015,28/11/2014,16:00,FK Rostov,Amkar,1,1,D,1.91,3.37,4.91,2.14,3.55,5.3,1.89,3.22,4.3
Russia,Premier League,2014/2015,29/11/2014,10:30,Arsenal Tula,Ural,1,2,A,2.65,3.14,3.04,2.65,3.3,3.08,2.49,3.05,2.89
Russia,Premier League,2014/2015,29/11/2014,12:45,CSKA Moscow,Ufa,5,0,H,1.29,5.75,13,1.31,6.6,16,1.27,5.18,10.63
Russia,Premier League,2014/2015,29/11/2014,15:00,M. Saransk,Zenit,1,0,H,7.82,4.53,1.48,8.7,4.9,1.5,7.02,4.25,1.44
Russia,Premier League,2014/2015,29/11/2014,17:15,Kuban,T. Moscow,1,1,D,1.47,4.35,8.7,1.47,4.95,9.6,1.42,4.15,7.68
Russia,Premier League,2014/2015,30/11/2014,10:30,Lokomotiv Moscow,Spartak Moscow,1,0,H,2.27,3.37,3.47,2.6,3.37,3.47,2.3,3.15,3.11
Russia,Premier League,2014/2015,30/11/2014,13:00,Rubin Kazan,Dynamo Moscow,1,1,D,2.57,3.3,3.02,2.75,3.35,3.1,2.53,3.12,2.79
Russia,Premier League,2014/2015,30/11/2014,15:30,Akhmat Grozny,Krasnodar,0,1,A,2.54,3.23,3.1,2.68,3.25,3.1,2.42,3.09,2.93
Russia,Premier League,2014/2015,02/12/2014,16:00,Arsenal Tula,Ufa,0,1,A,2.32,3.18,3.59,2.4,3.25,3.59,2.24,3.07,3.29
Russia,Premier League,2014/2015,02/12/2014,16:00,CSKA Moscow,Amkar,2,1,H,1.22,6.61,19.13,1.25,7.3,23,1.19,6.26,14.59
Russia,Premier League,2014/2015,03/12/2014,14:45,Rubin Kazan,Zenit,0,1,A,3.06,3.24,2.56,3.3,3.3,2.57,2.99,3.13,2.38
Russia,Premier League,2014/2015,03/12/2014,16:00,Lokomotiv Moscow,Ural,1,0,H,1.53,4.16,7.5,1.54,4.3,7.7,1.49,3.99,6.59
Russia,Premier League,2014/2015,03/12/2014,17:00,Akhmat Grozny,T. Moscow,0,1,A,1.47,4.42,8.38,1.49,4.75,9.7,1.42,4.15,7.69
Russia,Premier League,2014/2015,03/12/2014,17:00,Kuban,Krasnodar,1,1,D,2.85,3.18,2.78,2.98,3.2,2.8,2.73,3.03,2.65
Russia,Premier League,2014/2015,04/12/2014,14:45,M. Saransk,Dynamo Moscow,0,1,A,5.06,3.74,1.79,6.2,3.8,1.83,4.81,3.53,1.72
Russia,Premier League,2014/2015,04/12/2014,16:45,Spartak Moscow,FK Rostov,1,1,D,1.5,4.63,7.16,1.5,4.9,10,1.45,4.24,6.93
Russia,Premier League,2014/2015,06/12/2014,13:45,Zenit,Krasnodar,4,0,H,1.63,3.81,6.74,1.7,4,8,1.61,3.62,5.82
Russia,Premier League,2014/2015,06/12/2014,16:00,Kuban,CSKA Moscow,0,1,A,3.21,3.26,2.46,3.5,3.45,2.46,3.14,3.17,2.27
Russia,Premier League,2014/2015,07/12/2014,10:30,Akhmat Grozny,Lokomotiv Moscow,0,0,D,2.8,3.14,2.85,2.96,3.2,3.1,2.61,3.02,2.79
Russia,Premier League,2014/2015,07/12/2014,13:00,Dynamo Moscow,Amkar,5,0,H,1.28,5.8,13.5,1.29,6.9,16,1.25,5.47,11.13
Russia,Premier League,2014/2015,08/12/2014,14:00,M. Saransk,Rubin Kazan,0,1,A,3.75,3.46,2.13,4,3.46,2.15,3.58,3.18,2.07
Russia,Premier League,2014/2015,08/12/2014,14:00,T. Moscow,Ufa,2,2,D,2.36,3.11,3.58,2.39,3.4,3.65,2.25,3.02,3.33
Russia,Premier League,2014/2015,08/12/2014,16:00,FK Rostov,Arsenal Tula,0,1,A,2.02,3.34,4.37,2.07,3.55,4.37,1.97,3.21,3.88
Russia,Premier League,2014/2015,08/12/2014,17:00,Spartak Moscow,Ural,2,0,H,1.58,4.03,6.85,1.58,4.4,7.8,1.52,3.95,6.19
Russia,Premier League,2014/2015,07/03/2015,13:00,Akhmat Grozny,CSKA Moscow,1,2,A,3.29,3.09,2.52,3.45,3.25,2.52,3.17,3.04,2.34
Russia,Premier League,2014/2015,07/03/2015,16:00,Zenit,Ural,3,0,H,1.22,6.8,17.92,1.23,7.2,21,1.2,6.07,14.57
Russia,Premier League,2014/2015,08/03/2015,10:30,Spartak Moscow,Krasnodar,1,3,A,2.37,3.31,3.31,2.44,3.4,3.36,2.26,3.17,3.18
Russia,Premier League,2014/2015,08/03/2015,13:00,Dynamo Moscow,Ufa,3,1,H,1.34,5.12,12.15,1.35,5.5,12.56,1.33,4.69,9.74
Russia,Premier League,2014/2015,08/03/2015,15:30,FK Rostov,Lokomotiv Moscow,0,1,A,3.41,3.28,2.35,3.8,3.3,2.36,3.44,3.13,2.17
Russia,Premier League,2014/2015,09/03/2015,10:00,Amkar,T. Moscow,0,0,D,2.6,3.1,3.15,2.66,3.2,3.3,2.44,2.99,3.06
Russia,Premier League,2014/2015,09/03/2015,12:30,Rubin Kazan,Arsenal Tula,1,0,H,1.47,4.24,9.09,1.49,4.8,10.5,1.43,4.1,7.79
Russia,Premier League,2014/2015,09/03/2015,15:00,Kuban,M. Saransk,0,0,D,1.51,4.07,8.58,1.57,4.3,8.83,1.49,3.82,7.27
Russia,Premier League,2014/2015,13/03/2015,16:00,Krasnodar,Ural,1,1,D,1.42,4.72,9.25,1.45,5.2,12,1.4,4.26,8.33
Russia,Premier League,2014/2015,14/03/2015,10:00,Ufa,Amkar,1,1,D,2.52,3.11,3.27,2.6,3.25,3.45,2.43,2.99,3.07
Russia,Premier League,2014/2015,14/03/2015,13:00,CSKA Moscow,M. Saransk,4,0,H,1.31,5.47,12.73,1.4,6.2,16,1.3,4.93,10.62
Russia,Premier League,2014/2015,14/03/2015,16:00,Lokomotiv Moscow,Arsenal Tula,0,1,A,1.51,4.09,8.34,1.52,4.55,9.2,1.46,3.89,7.78
Russia,Premier League,2014/2015,15/03/2015,10:30,Spartak Moscow,Dynamo Moscow,1,0,H,2.89,3.44,2.58,3.25,3.45,2.62,2.78,3.24,2.48
Russia,Premier League,2014/2015,15/03/2015,13:00,T. Moscow,Zenit,1,1,D,8.58,4.62,1.44,13,5.1,1.44,8.05,4.27,1.4
Russia,Premier League,2014/2015,15/03/2015,15:30,Rubin Kazan,Akhmat Grozny,2,1,H,2.32,3.04,3.75,2.32,3.13,4,2.21,3.03,3.46
Russia,Premier League,2014/2015,16/03/2015,16:00,FK Rostov,Kuban,2,1,H,3.68,3.15,2.29,3.75,3.2,2.56,3.4,2.99,2.26
Russia,Premier League,2014/2015,20/03/2015,14:00,Ufa,Krasnodar,0,2,A,4.68,3.52,1.9,5.9,3.6,1.9,4.67,3.29,1.8
Russia,Premier League,2014/2015,21/03/2015,09:00,Ural,Amkar,1,0,H,2.32,3.14,3.64,2.32,3.2,3.85,2.18,3.05,3.5
Russia,Premier League,2014/2015,21/03/2015,11:15,Arsenal Tula,CSKA Moscow,1,4,A,35.64,12.71,1.09,45.1,12.71,1.13,26.65,9.88,1.08
Russia,Premier League,2014/2015,21/03/2015,11:15,Rubin Kazan,FK Rostov,2,0,H,1.82,3.59,5.08,1.88,3.6,5.97,1.72,3.42,5.05
Russia,Premier League,2014/2015,21/03/2015,16:00,T. Moscow,Spartak Moscow,0,1,A,5.99,4.06,1.63,7.3,4.25,1.64,5.8,3.77,1.58
Russia,Premier League,2014/2015,22/03/2015,10:30,Dynamo Moscow,Zenit,0,1,A,2.96,3.27,2.63,3.45,3.3,2.68,2.94,3.15,2.41
Russia,Premier League,2014/2015,22/03/2015,13:00,M. Saransk,Lokomotiv Moscow,0,0,D,4.23,3.23,2.09,4.4,3.25,2.14,3.94,3.1,2.02
Russia,Premier League,2014/2015,22/03/2015,15:30,Kuban,Akhmat Grozny,1,0,H,2.23,3.13,3.89,2.28,3.25,3.95,2.15,3.03,3.59
Russia,Premier League,2014/2015,04/04/2015,10:00,Amkar,Rubin Kazan,0,3,A,4.73,3.19,2.01,5.1,3.3,2.01,4.29,3.11,1.94
Russia,Premier League,2014/2015,04/04/2015,12:15,Dynamo Moscow,Lokomotiv Moscow,2,2,D,1.93,3.49,4.56,1.94,3.6,5.1,1.86,3.36,4.22
Russia,Premier League,2014/2015,04/04/2015,14:45,Krasnodar,M. Saransk,4,0,H,1.42,4.64,9.5,1.42,5.1,13,1.39,4.35,8.46
Russia,Premier League,2014/2015,04/04/2015,17:00,Spartak Moscow,Kuban,1,1,D,2.43,3.26,3.25,2.44,3.35,3.75,2.28,3.11,3.21
Russia,Premier League,2014/2015,05/04/2015,11:30,Zenit,CSKA Moscow,2,1,H,1.93,3.55,4.46,1.96,3.8,4.8,1.89,3.33,4.18
Russia,Premier League,2014/2015,05/04/2015,13:45,Ural,FK Rostov,0,1,A,2.42,3.02,3.56,2.74,3.12,3.56,2.42,2.97,3.1
Russia,Premier League,2014/2015,05/04/2015,16:00,Ufa,Akhmat Grozny,0,1,A,3.89,3.21,2.19,4.25,3.3,2.2,3.59,3.05,2.14
Russia,Premier League,2014/2015,05/04/2015,18:15,Arsenal Tula,T. Moscow,1,3,A,2.43,3.08,3.48,2.68,3.1,3.49,2.36,2.96,3.21
Russia,Premier League,2014/2015,07/04/2015,15:45,M. Saransk,Amkar,1,0,H,2.3,3.09,3.77,2.3,3.2,4.15,2.21,3,3.48
Russia,Premier League,2014/2015,07/04/2015,18:00,Rubin Kazan,Krasnodar,1,2,A,2.21,3.21,3.83,2.4,3.21,4,2.19,3.07,3.44
Russia,Premier League,2014/2015,08/04/2015,15:45,Akhmat Grozny,Zenit,1,2,A,4.62,3.25,2,5.1,3.6,2.02,4.41,3.25,1.86
Russia,Premier League,2014/2015,08/04/2015,17:00,Kuban,Ural,0,2,A,1.48,4.25,8.8,1.55,4.4,10.5,1.47,3.88,7.53
Russia,Premier League,2014/2015,08/04/2015,18:00,Lokomotiv Moscow,T. Moscow,2,0,H,1.57,4.02,7.09,1.57,4.02,8,1.52,3.74,6.71
Russia,Premier League,2014/2015,08/04/2015,18:30,CSKA Moscow,Dynamo Moscow,1,2,A,2.13,3.57,3.62,2.24,3.57,3.8,2.05,3.33,3.5
Russia,Premier League,2014/2015,09/04/2015,15:45,Arsenal Tula,Spartak Moscow,1,0,H,4.19,3.48,2.01,6.3,3.76,2.02,4.41,3.4,1.83
Russia,Premier League,2014/2015,09/04/2015,18:00,FK Rostov,Ufa,2,0,H,2.07,3.24,4.28,2.25,3.4,4.6,1.99,3.13,3.97
Russia,Premier League,2014/2015,11/04/2015,17:00,Krasnodar,Kuban,3,2,H,2.1,3.37,3.99,2.15,3.55,4.65,2.03,3.21,3.72
Russia,Premier League,2014/2015,12/04/2015,11:30,Zenit,Rubin Kazan,1,1,D,1.63,3.88,6.61,1.63,4.25,7.2,1.55,3.73,6.26
Russia,Premier League,2014/2015,12/04/2015,14:00,Ufa,Arsenal Tula,0,1,A,2.64,3.07,3.12,2.69,3.2,3.31,2.44,2.96,3.07
Russia,Premier League,2014/2015,12/04/2015,16:30,Dynamo Moscow,M. Saransk,2,1,H,1.29,5.61,13.7,1.3,6.3,15,1.27,5.28,10.9
Russia,Premier League,2014/2015,13/04/2015,13:00,Ural,Lokomotiv Moscow,2,0,H,5.34,3.31,1.88,6.1,3.4,1.9,4.84,3.17,1.82
Russia,Premier League,2014/2015,13/04/2015,15:15,Amkar,CSKA Moscow,1,0,H,6.04,4.24,1.61,11.5,5,1.65,6.98,3.96,1.5
Russia,Premier League,2014/2015,13/04/2015,16:00,T. Moscow,Akhmat Grozny,0,0,D,3.34,3.17,2.44,3.55,3.2,2.53,3.29,3,2.3
Russia,Premier League,2014/2015,13/04/2015,17:30,FK Rostov,Spartak Moscow,2,1,H,2.72,3.19,2.91,3.02,3.25,2.91,2.7,3.05,2.67
Russia,Premier League,2014/2015,18/04/2015,11:00,Ufa,Lokomotiv Moscow,1,0,H,4.64,3.17,2.02,5.1,3.4,2.03,4.24,3.11,1.94
Russia,Premier League,2014/2015,18/04/2015,14:00,M. Saransk,Spartak Moscow,1,3,A,2.97,3.29,2.6,3.25,3.35,2.6,2.92,3.09,2.47
Russia,Premier League,2014/2015,18/04/2015,17:00,Rubin Kazan,Ural,2,1,H,1.61,3.86,6.85,1.62,4.1,7.5,1.57,3.63,6.29
Russia,Premier League,2014/2015,19/04/2015,11:30,CSKA Moscow,Krasnodar,1,1,D,2,3.54,4.14,2.06,3.6,4.26,1.95,3.36,3.82
Russia,Premier League,2014/2015,19/04/2015,14:00,Akhmat Grozny,Dynamo Moscow,0,0,D,2.95,3.25,2.64,3.18,3.3,2.65,2.88,3.13,2.46
Russia,Premier League,2014/2015,19/04/2015,16:30,Kuban,Zenit,0,0,D,3.54,3.29,2.28,3.9,3.45,2.32,3.37,3.15,2.18
Russia,Premier League,2014/2015,20/04/2015,15:00,Amkar,Arsenal Tula,0,1,A,2.22,3.09,3.99,2.51,3.2,4.02,2.23,2.98,3.45
Russia,Premier League,2014/2015,20/04/2015,17:30,FK Rostov,T. Moscow,1,0,H,1.76,3.38,6.2,1.85,3.78,6.9,1.76,3.26,5.11
Russia,Premier League,2014/2015,24/04/2015,11:00,Ufa,Kuban,3,2,H,4.06,3.04,2.19,4.06,3.3,2.2,3.77,3.02,2.1
Russia,Premier League,2014/2015,24/04/2015,17:00,M. Saransk,Ural,2,1,H,2.55,3.2,3.12,2.6,3.2,3.25,2.43,2.97,3.07
Russia,Premier League,2014/2015,25/04/2015,11:00,Amkar,Akhmat Grozny,2,1,H,3.31,3.03,2.56,3.65,3.2,2.56,3.17,2.93,2.41
Russia,Premier League,2014/2015,25/04/2015,14:00,T. Moscow,CSKA Moscow,0,2,A,9.57,4.4,1.44,11.5,5.6,1.45,8.06,4.23,1.41
Russia,Premier League,2014/2015,25/04/2015,17:00,Krasnodar,Lokomotiv Moscow,1,0,H,1.73,3.65,5.77,1.85,3.8,5.9,1.73,3.46,4.94
Russia,Premier League,2014/2015,26/04/2015,11:30,Spartak Moscow,Rubin Kazan,1,0,H,2.87,3.23,2.73,2.88,3.3,3.13,2.64,3.09,2.7
Russia,Premier League,2014/2015,26/04/2015,14:00,FK Rostov,Dynamo Moscow,2,2,D,3.41,3.36,2.29,4.65,3.36,2.33,3.34,3.18,2.18
Russia,Premier League,2014/2015,26/04/2015,16:30,Zenit,Arsenal Tula,1,0,H,1.21,6.81,19.82,1.22,8.4,23,1.2,6.16,13.95
Russia,Premier League,2014/2015,30/04/2015,15:00,Amkar,Dynamo Moscow,2,0,H,5.51,3.74,1.74,6.9,3.95,1.8,4.94,3.48,1.72
Russia,Premier League,2014/2015,02/05/2015,11:30,Spartak Moscow,Zenit,1,1,D,4.95,3.5,1.86,5.2,3.7,1.97,4.31,3.36,1.85
Russia,Premier League,2014/2015,02/05/2015,17:00,FK Rostov,Akhmat Grozny,0,1,A,2.3,3.05,3.8,2.36,3.2,3.8,2.25,2.96,3.43
Russia,Premier League,2014/2015,03/05/2015,11:30,Kuban,Dynamo Moscow,1,2,A,2.83,3.37,2.67,3.04,3.37,2.81,2.66,3.1,2.66
Russia,Premier League,2014/2015,03/05/2015,14:00,Amkar,Lokomotiv Moscow,1,1,D,3.07,3.09,2.67,3.1,3.25,2.72,2.95,2.98,2.51
Russia,Premier League,2014/2015,03/05/2015,16:30,T. Moscow,Rubin Kazan,2,2,D,4.9,3.32,1.93,5.3,3.55,1.97,4.56,3.28,1.82
Russia,Premier League,2014/2015,04/05/2015,11:00,Ufa,M. Saransk,1,2,A,2.26,3.24,3.65,2.38,3.25,3.82,2.22,3.02,3.42
Russia,Premier League,2014/2015,04/05/2015,13:30,Arsenal Tula,Krasnodar,0,3,A,7.64,4.31,1.51,8.8,4.6,1.55,6.71,3.94,1.5
Russia,Premier League,2014/2015,04/05/2015,16:00,CSKA Moscow,Ural,3,1,H,1.33,5.12,12.5,1.36,5.7,15,1.3,4.87,10.47
Russia,Premier League,2014/2015,08/05/2015,14:30,Ural,Ufa,1,1,D,2.54,3.13,3.22,2.54,3.3,3.6,2.34,3.02,3.15
Russia,Premier League,2014/2015,08/05/2015,17:00,Rubin Kazan,Kuban,1,0,H,1.65,3.83,6.22,1.7,3.9,6.7,1.61,3.58,5.76
Russia,Premier League,2014/2015,10/05/2015,11:30,Lokomotiv Moscow,CSKA Moscow,1,3,A,3.74,3.32,2.19,4.1,3.45,2.21,3.59,3.19,2.07
Russia,Premier League,2014/2015,10/05/2015,14:00,Dynamo Moscow,T. Moscow,0,0,D,1.35,5.27,10.67,1.35,5.6,13,1.31,4.86,9.49
Russia,Premier League,2014/2015,10/05/2015,16:30,Zenit,FK Rostov,3,0,H,1.32,5.65,10.95,1.32,6.1,14.5,1.28,5.14,10.51
Russia,Premier League,2014/2015,11/05/2015,11:30,Akhmat Grozny,Spartak Moscow,4,2,H,2.65,3.23,2.96,2.76,3.3,2.96,2.55,3.08,2.77
Russia,Premier League,2014/2015,11/05/2015,14:00,M. Saransk,Arsenal Tula,1,0,H,2.42,3.28,3.28,2.43,3.28,3.52,2.33,3.06,3.13
Russia,Premier League,2014/2015,11/05/2015,16:30,Krasnodar,Amkar,1,1,D,1.39,4.92,9.82,1.4,5.2,13,1.36,4.45,8.86
Russia,Premier League,2014/2015,15/05/2015,17:00,M. Saransk,FK Rostov,0,0,D,4.04,3.42,2.07,4.5,3.62,2.1,3.76,3.26,2
Russia,Premier League,2014/2015,16/05/2015,12:00,Amkar,Kuban,1,0,H,1.9,3.55,4.62,1.93,3.6,5.2,1.86,3.32,4.3
Russia,Premier League,2014/2015,16/05/2015,14:30,Arsenal Tula,Akhmat Grozny,1,1,D,2.55,3.18,3.14,2.55,3.26,3.18,2.44,3.06,2.95
Russia,Premier League,2014/2015,16/05/2015,17:00,Lokomotiv Moscow,Rubin Kazan,3,0,H,3.46,3.26,2.34,3.5,3.26,2.4,3.24,3.07,2.28
Russia,Premier League,2014/2015,17/05/2015,11:30,Spartak Moscow,CSKA Moscow,0,4,A,3.92,3.53,2.07,4.5,3.78,2.1,3.62,3.33,2.02
Russia,Premier League,2014/2015,17/05/2015,14:00,Ufa,Zenit,1,1,D,11.4,6.75,1.27,17.5,6.9,1.27,11.77,5.61,1.24
Russia,Premier League,2014/2015,17/05/2015,16:30,Krasnodar,T. Moscow,2,2,D,1.41,4.7,9.76,1.42,5.1,11.5,1.36,4.46,8.92
Russia,Premier League,2014/2015,18/05/2015,15:00,Ural,Dynamo Moscow,2,1,H,5.15,4.01,1.71,5.7,4.01,1.76,4.83,3.6,1.71
Russia,Premier League,2014/2015,23/05/2015,11:00,Amkar,Zenit,1,0,H,3.13,3.57,2.36,3.29,3.57,2.55,2.95,3.25,2.35
Russia,Premier League,2014/2015,23/05/2015,13:30,T. Moscow,Ural,3,1,H,2.57,3.33,2.99,2.91,3.33,2.99,2.56,3.12,2.78
Russia,Premier League,2014/2015,23/05/2015,16:00,Spartak Moscow,Ufa,1,2,A,1.79,3.84,4.9,1.79,4.05,6,1.7,3.61,4.89
Russia,Premier League,2014/2015,24/05/2015,11:30,Krasnodar,FK Rostov,2,1,H,1.78,3.93,4.83,1.78,4.2,5.5,1.71,3.64,4.68
Russia,Premier League,2014/2015,24/05/2015,14:00,M. Saransk,Akhmat Grozny,1,0,H,3.46,3.31,2.3,3.62,3.4,2.33,3.3,3.16,2.21
Russia,Premier League,2014/2015,24/05/2015,16:30,Dynamo Moscow,Arsenal Tula,2,2,D,1.49,4.98,6.64,1.52,5,8.5,1.45,4.48,6.28
Russia,Premier League,2014/2015,25/05/2015,16:30,Lokomotiv Moscow,Kuban,1,1,D,2.02,3.44,4.19,2.08,3.78,4.19,1.98,3.29,3.81
Russia,Premier League,2014/2015,25/05/2015,18:45,CSKA Moscow,Rubin Kazan,3,0,H,1.54,4.28,6.99,1.55,4.95,8.1,1.5,4.03,6.61
Russia,Premier League,2014/2015,30/05/2015,11:30,Akhmat Grozny,Ural,1,3,A,2.58,3.71,2.7,3,3.8,2.82,2.57,3.41,2.56
Russia,Premier League,2014/2015,30/05/2015,11:30,Dynamo Moscow,Krasnodar,1,1,D,2.76,3.65,2.58,2.85,3.65,2.6,2.64,3.38,2.51
Russia,Premier League,2014/2015,30/05/2015,11:30,FK Rostov,CSKA Moscow,1,1,D,5.36,4.21,1.66,6.4,4.4,1.67,5.31,3.92,1.59
Russia,Premier League,2014/2015,30/05/2015,11:30,Kuban,Arsenal Tula,5,1,H,3.2,3.88,2.21,3.55,3.88,2.21,3.25,3.47,2.1
Russia,Premier League,2014/2015,30/05/2015,11:30,Spartak Moscow,Amkar,3,3,D,1.88,3.86,4.32,1.9,4,4.4,1.83,3.58,4.05
Russia,Premier League,2014/2015,30/05/2015,11:30,T. Moscow,M. Saransk,2,0,H,1.37,5.18,9.86,1.45,5.18,9.86,1.37,4.61,7.87
Russia,Premier League,2014/2015,30/05/2015,11:30,Ufa,Rubin Kazan,1,1,D,3.68,3.6,2.1,3.68,3.65,2.38,3.37,3.33,2.11
Russia,Premier League,2014/2015,30/05/2015,11:30,Zenit,Lokomotiv Moscow,1,0,H,1.5,4.55,7.19,1.5,4.65,7.5,1.46,4.27,6.53
Russia,Premier League,2014/2015,03/06/2015,14:00,Tomsk,Ural,0,1,A,2.88,3.4,2.6,3.18,3.4,2.7,2.84,3.07,2.5
Russia,Premier League,2014/2015,03/06/2015,16:30,Tosno,FK Rostov,0,1,A,3.36,3.2,2.41,4,3.4,2.43,3.52,3.07,2.15
Russia,Premier League,2014/2015,07/06/2015,13:00,Ural,Tomsk,0,0,D,2.13,3.32,3.95,2.22,3.45,4.3,2.03,3.22,3.65
Russia,Premier League,2014/2015,07/06/2015,17:00,FK Rostov,Tosno,4,1,H,1.55,4.01,7.73,1.6,4.55,7.73,1.53,3.74,6.48
Russia,Premier League,2015/2016,17/07/2015,17:00,Spartak Moscow,Ufa,2,2,D,1.42,4.8,8.75,1.5,5.1,8.75,1.44,4.27,6.97
Russia,Premier League,2015/2016,18/07/2015,16:30,CSKA Moscow,Rubin Kazan,1,0,H,1.61,4.06,6.44,1.61,4.25,7.6,1.56,3.81,5.98
Russia,Premier League,2015/2016,18/07/2015,19:00,FK Rostov,Akhmat Grozny,1,1,D,2.53,3.16,3.2,2.6,3.3,3.62,2.46,3.03,2.97
Russia,Premier League,2015/2016,19/07/2015,11:30,Zenit,Dynamo Moscow,2,1,H,1.7,3.95,5.46,1.7,4.2,5.9,1.64,3.75,5.11
Russia,Premier League,2015/2016,19/07/2015,16:00,M. Saransk,Lokomotiv Moscow,0,1,A,4.22,3.3,2.06,4.85,3.5,2.11,3.79,3.2,2.03
Russia,Premier League,2015/2016,19/07/2015,19:00,FK Anzi Makhackala,FK Krylya Sovetov Samara,0,1,A,1.97,3.39,4.49,2.02,3.46,5.3,1.87,3.27,4.37
Russia,Premier League,2015/2016,20/07/2015,15:00,Amkar,Krasnodar,0,1,A,4,3.5,2.04,4.65,3.5,2.07,3.85,3.3,1.97
Russia,Premier League,2015/2016,20/07/2015,18:00,Kuban,Ural,0,2,A,1.72,3.75,5.57,1.77,3.92,6.5,1.71,3.51,5.02
Russia,Premier League,2015/2016,24/07/2015,17:00,FK Krylya Sovetov Samara,CSKA Moscow,0,2,A,7.43,3.89,1.58,7.9,4.33,1.6,6.52,3.8,1.53
Russia,Premier League,2015/2016,25/07/2015,14:00,Ufa,FK Rostov,1,2,A,3,3.27,2.57,3.42,3.27,2.62,2.96,3.04,2.47
Russia,Premier League,2015/2016,25/07/2015,16:30,Dynamo Moscow,M. Saransk,2,2,D,1.31,5.64,11.79,1.4,5.7,14.5,1.31,4.93,9.83
Russia,Premier League,2015/2016,25/07/2015,19:00,Akhmat Grozny,Kuban,1,1,D,2.03,3.22,4.49,2.2,3.3,4.49,2.03,3.13,3.85
Russia,Premier League,2015/2016,26/07/2015,11:30,Ural,Zenit,1,4,A,6.45,4.12,1.6,7,4.2,1.64,6.07,3.82,1.56
Russia,Premier League,2015/2016,26/07/2015,15:00,Rubin Kazan,Amkar,0,2,A,1.71,3.77,5.71,1.76,3.8,6.8,1.66,3.52,5.47
Russia,Premier League,2015/2016,26/07/2015,18:00,Krasnodar,Spartak Moscow,0,1,A,1.91,3.94,4.06,2.07,3.94,4.06,1.91,3.6,3.72
Russia,Premier League,2015/2016,27/07/2015,18:00,FK Anzi Makhackala,Lokomotiv Moscow,1,3,A,2.96,3.11,2.74,3.16,3.2,2.79,2.9,2.97,2.55
Russia,Premier League,2015/2016,31/07/2015,18:00,Kuban,Ufa,1,1,D,2,3.34,4.45,2.01,3.6,4.9,1.9,3.21,4.29
Russia,Premier League,2015/2016,01/08/2015,12:00,Amkar,FK Krylya Sovetov Samara,1,0,H,2.17,3.2,3.96,2.22,3.3,4,2.11,3.12,3.6
Russia,Premier League,2015/2016,01/08/2015,15:00,Zenit,Akhmat Grozny,3,0,H,1.37,4.83,11.58,1.4,5.8,11.58,1.36,4.54,8.86
Russia,Premier League,2015/2016,01/08/2015,17:30,CSKA Moscow,FK Anzi Makhackala,1,0,H,1.38,4.8,10.62,1.4,5.2,10.62,1.36,4.52,8.78
Russia,Premier League,2015/2016,02/08/2015,11:30,Lokomotiv Moscow,Dynamo Moscow,1,1,D,2.53,3.33,3.03,2.58,3.37,3.2,2.4,3.17,2.95
Russia,Premier League,2015/2016,02/08/2015,15:00,M. Saransk,Ural,1,1,D,2.8,3.14,2.86,2.81,3.2,2.96,2.63,3.02,2.77
Russia,Premier League,2015/2016,02/08/2015,18:00,FK Rostov,Krasnodar,0,0,D,3.36,3.37,2.32,3.64,3.37,2.35,3.22,3.18,2.25
Russia,Premier League,2015/2016,03/08/2015,17:00,Spartak Moscow,Rubin Kazan,1,0,H,1.69,3.87,5.64,1.8,4.33,5.7,1.7,3.65,4.9
Russia,Premier League,2015/2016,07/08/2015,17:00,Akhmat Grozny,M. Saransk,0,0,D,1.6,3.82,7.33,1.7,3.9,7.33,1.6,3.59,6.04
Russia,Premier League,2015/2016,08/08/2015,15:00,Ural,Lokomotiv Moscow,1,3,A,3.3,3.18,2.46,3.6,3.25,2.46,3.26,3.06,2.29
Russia,Premier League,2015/2016,08/08/2015,18:00,FK Anzi Makhackala,Dynamo Moscow,2,3,A,3.29,3.4,2.34,3.42,3.4,2.4,3.11,3.22,2.28
Russia,Premier League,2015/2016,09/08/2015,11:30,CSKA Moscow,Amkar,2,0,H,1.32,5.06,13.67,1.36,5.4,13.67,1.32,4.66,10.49
Russia,Premier League,2015/2016,09/08/2015,14:00,Ufa,Zenit,0,1,A,8.62,4.58,1.45,9.8,5.3,1.45,7.95,4.35,1.4
Russia,Premier League,2015/2016,09/08/2015,17:00,FK Krylya Sovetov Samara,Spartak Moscow,0,2,A,4.48,3.47,1.94,5.5,3.64,2,4.25,3.34,1.87
Russia,Premier League,2015/2016,10/08/2015,16:00,Rubin Kazan,FK Rostov,0,3,A,2.18,3.26,3.86,2.22,3.3,3.86,2.12,3.13,3.54
Russia,Premier League,2015/2016,10/08/2015,18:15,Krasnodar,Kuban,1,1,D,1.88,3.55,4.68,2.01,3.6,5.1,1.85,3.34,4.29
Russia,Premier League,2015/2016,14/08/2015,15:00,Amkar,FK Anzi Makhackala,1,1,D,2.38,3.27,3.34,2.52,3.29,3.4,2.27,3.11,3.23
Russia,Premier League,2015/2016,14/08/2015,19:30,Spartak Moscow,CSKA Moscow,1,2,A,3.36,3.42,2.3,3.36,3.42,2.44,3.11,3.24,2.27
Russia,Premier League,2015/2016,15/08/2015,14:30,Zenit,Krasnodar,0,2,A,1.55,4.19,7.09,1.6,4.33,7.9,1.51,3.88,6.55
Russia,Premier League,2015/2016,15/08/2015,19:30,Kuban,Rubin Kazan,0,1,A,2.22,3.26,3.73,2.27,3.4,3.74,2.14,3.15,3.49
Russia,Premier League,2015/2016,16/08/2015,11:30,Lokomotiv Moscow,Akhmat Grozny,0,0,D,1.74,3.61,5.76,1.75,3.75,6.5,1.69,3.45,5.25
Russia,Premier League,2015/2016,16/08/2015,15:00,Dynamo Moscow,Ural,1,0,H,1.92,3.6,4.42,2.08,3.7,5.11,1.82,3.45,4.36
Russia,Premier League,2015/2016,16/08/2015,18:00,FK Rostov,FK Krylya Sovetov Samara,1,1,D,1.78,3.55,5.46,1.81,3.9,5.7,1.73,3.4,5.01
Russia,Premier League,2015/2016,17/08/2015,17:00,M. Saransk,Ufa,0,1,A,3.53,2.99,2.45,3.53,3.2,2.74,3.15,2.95,2.41
Russia,Premier League,2015/2016,21/08/2015,18:00,Akhmat Grozny,Dynamo Moscow,1,1,D,2.55,3.18,3.14,2.56,3.35,3.25,2.44,3.06,2.99
Russia,Premier League,2015/2016,22/08/2015,13:00,Amkar,Spartak Moscow,1,3,A,4.88,3.5,1.87,5.6,3.6,1.95,4.38,3.31,1.85
Russia,Premier League,2015/2016,22/08/2015,16:00,CSKA Moscow,FK Rostov,2,1,H,1.53,4.37,6.9,1.58,4.37,7.2,1.51,3.97,6.5
Russia,Premier League,2015/2016,22/08/2015,18:30,FK Anzi Makhackala,Ural,1,1,D,2.38,3.08,3.56,2.38,3.22,3.75,2.27,3.02,3.34
Russia,Premier League,2015/2016,23/08/2015,11:30,Ufa,Lokomotiv Moscow,0,3,A,4.43,3.39,1.98,4.43,3.4,2.1,3.94,3.21,1.98
Russia,Premier League,2015/2016,23/08/2015,18:00,Krasnodar,M. Saransk,0,0,D,1.42,4.6,9.71,1.44,4.8,11.5,1.39,4.27,8.54
Russia,Premier League,2015/2016,24/08/2015,17:00,FK Krylya Sovetov Samara,Kuban,3,0,H,2.79,3.24,2.79,2.88,3.3,2.88,2.74,3,2.68
Russia,Premier League,2015/2016,24/08/2015,17:00,Rubin Kazan,Zenit,1,3,A,6.1,3.8,1.67,6.9,4.05,1.75,5.58,3.57,1.64
Russia,Premier League,2015/2016,28/08/2015,15:00,Ural,Akhmat Grozny,3,3,D,6.1,3.69,1.69,6.1,3.75,2.05,4.85,3.4,1.76
Russia,Premier League,2015/2016,28/08/2015,18:00,FK Rostov,Amkar,1,0,H,1.99,3.25,4.64,2,3.4,5,1.9,3.21,4.35
Russia,Premier League,2015/2016,29/08/2015,12:00,Dynamo Moscow,Ufa,2,0,H,1.73,3.63,5.85,1.82,3.65,5.85,1.7,3.47,5.14
Russia,Premier League,2015/2016,29/08/2015,15:00,Zenit,FK Krylya Sovetov Samara,1,3,A,1.24,6.29,16.4,1.27,6.5,16.4,1.23,5.61,12.97
Russia,Premier League,2015/2016,29/08/2015,17:30,Spartak Moscow,FK Anzi Makhackala,1,2,A,1.53,4.37,6.98,1.53,4.8,8.5,1.46,4.19,6.88
Russia,Premier League,2015/2016,30/08/2015,11:30,Lokomotiv Moscow,Krasnodar,2,1,H,2.17,3.24,3.89,2.35,3.25,4,2.14,3.13,3.53
Russia,Premier League,2015/2016,30/08/2015,15:00,M. Saransk,Rubin Kazan,2,1,H,3.89,3.22,2.18,4.15,3.3,2.27,3.56,3.1,2.15
Russia,Premier League,2015/2016,30/08/2015,18:00,Kuban,CSKA Moscow,0,1,A,5.36,3.59,1.79,6.1,3.72,1.85,4.83,3.44,1.75
Russia,Premier League,2015/2016,12/09/2015,12:00,CSKA Moscow,Zenit,2,2,D,2.35,3.4,3.27,2.35,3.44,3.35,2.26,3.2,3.18
Russia,Premier League,2015/2016,12/09/2015,14:30,Amkar,Kuban,1,1,D,2.95,3.08,2.77,2.95,3.1,2.97,2.74,2.94,2.72
Russia,Premier League,2015/2016,12/09/2015,17:00,Rubin Kazan,Lokomotiv Moscow,3,1,H,3.73,3.29,2.21,3.9,3.3,2.25,3.46,3.17,2.14
Russia,Premier League,2015/2016,13/09/2015,11:30,Spartak Moscow,FK Rostov,1,0,H,1.77,3.74,5.18,1.78,3.84,5.7,1.72,3.53,4.9
Russia,Premier League,2015/2016,13/09/2015,14:30,Krasnodar,Dynamo Moscow,4,0,H,1.97,3.55,4.24,2.1,3.65,4.4,1.96,3.39,3.79
Russia,Premier League,2015/2016,13/09/2015,17:00,FK Anzi Makhackala,Akhmat Grozny,0,2,A,2.75,3.14,2.92,2.76,3.2,3,2.65,3.04,2.75
Russia,Premier League,2015/2016,14/09/2015,14:00,Ufa,Ural,0,1,A,2.7,3.13,2.98,2.82,3.2,3.2,2.6,2.99,2.85
Russia,Premier League,2015/2016,14/09/2015,16:30,FK Krylya Sovetov Samara,M. Saransk,1,0,H,2.05,3.4,4.12,2.1,3.55,4.5,1.99,3.22,3.88
Russia,Premier League,2015/2016,18/09/2015,17:00,FK Rostov,FK Anzi Makhackala,1,0,H,2.02,3.42,4.2,2.04,3.5,4.65,1.92,3.32,4.05
Russia,Premier League,2015/2016,19/09/2015,14:00,Akhmat Grozny,Ufa,4,1,H,1.63,3.72,6.94,1.65,3.9,8.1,1.58,3.6,6.31
Russia,Premier League,2015/2016,19/09/2015,17:00,Kuban,Spartak Moscow,3,0,H,3.55,3.4,2.23,3.92,3.48,2.25,3.38,3.25,2.14
Russia,Premier League,2015/2016,20/09/2015,11:30,M. Saransk,CSKA Moscow,4,6,A,8.23,4.16,1.51,9,4.4,1.51,7.45,4.03,1.46
Russia,Premier League,2015/2016,20/09/2015,15:00,Zenit,Amkar,1,1,D,1.26,5.95,15.88,1.28,6.6,20,1.23,5.63,13.11
Russia,Premier League,2015/2016,20/09/2015,17:30,Lokomotiv Moscow,FK Krylya Sovetov Samara,2,0,H,1.72,3.63,5.93,1.72,3.88,6.35,1.66,3.51,5.46
Russia,Premier League,2015/2016,21/09/2015,14:30,Ural,Krasnodar,3,1,H,3.41,3.33,2.32,3.8,3.4,2.32,3.28,3.18,2.22
Russia,Premier League,2015/2016,21/09/2015,17:00,Dynamo Moscow,Rubin Kazan,0,0,D,2.18,3.43,3.63,2.24,3.43,4,2.09,3.28,3.48
Russia,Premier League,2015/2016,26/09/2015,12:00,CSKA Moscow,Lokomotiv Moscow,1,1,D,1.92,3.39,4.77,1.96,3.46,4.81,1.87,3.29,4.33
Russia,Premier League,2015/2016,26/09/2015,14:30,FK Anzi Makhackala,Ufa,1,1,D,1.63,3.75,6.88,1.8,3.8,7.6,1.63,3.47,6.04
Russia,Premier League,2015/2016,26/09/2015,17:00,Spartak Moscow,Zenit,2,2,D,3.39,3.47,2.26,3.62,3.55,2.35,3.19,3.28,2.23
Russia,Premier League,2015/2016,27/09/2015,11:30,FK Krylya Sovetov Samara,Dynamo Moscow,0,0,D,3.26,3.28,2.42,3.35,3.28,2.5,3.1,3.11,2.35
Russia,Premier League,2015/2016,27/09/2015,14:30,Krasnodar,Akhmat Grozny,1,1,D,1.93,3.5,4.53,1.96,3.6,4.7,1.89,3.36,4.12
Russia,Premier League,2015/2016,27/09/2015,17:00,Rubin Kazan,Ural,1,2,A,2.06,3.38,4.2,2.06,3.45,4.45,1.98,3.19,3.98
Russia,Premier League,2015/2016,28/09/2015,14:30,Amkar,M. Saransk,2,1,H,2.33,3.14,3.6,2.42,3.3,3.62,2.26,3.01,3.38
Russia,Premier League,2015/2016,28/09/2015,17:00,FK Rostov,Kuban,2,1,H,2.27,3.22,3.65,2.34,3.3,3.65,2.19,3.1,3.42
Russia,Premier League,2015/2016,02/10/2015,15:00,Ural,FK Krylya Sovetov Samara,1,1,D,2.3,3.29,3.49,2.35,3.3,3.7,2.21,3.1,3.39
Russia,Premier League,2015/2016,03/10/2015,12:30,M. Saransk,Spartak Moscow,0,1,A,4.79,3.63,1.85,5.3,3.85,1.87,4.43,3.44,1.81
Russia,Premier League,2015/2016,03/10/2015,15:00,Zenit,FK Rostov,3,0,H,1.45,4.44,8.99,1.48,4.65,8.99,1.44,4.14,7.45
Russia,Premier League,2015/2016,03/10/2015,17:30,Kuban,FK Anzi Makhackala,1,1,D,2.49,3.26,3.14,2.49,3.3,3.86,2.3,3.09,3.22
Russia,Premier League,2015/2016,04/10/2015,11:30,Dynamo Moscow,CSKA Moscow,0,2,A,3.62,3.38,2.21,3.86,3.48,2.29,3.47,3.24,2.12
Russia,Premier League,2015/2016,04/10/2015,14:00,Akhmat Grozny,Rubin Kazan,2,1,H,1.97,3.36,4.52,2,3.45,5.3,1.91,3.25,4.2
Russia,Premier League,2015/2016,04/10/2015,14:00,Ufa,Krasnodar,1,1,D,4.42,3.51,1.94,5.2,3.66,1.94,4.28,3.37,1.85
Russia,Premier League,2015/2016,04/10/2015,17:00,Lokomotiv Moscow,Amkar,3,0,H,1.6,3.84,7.2,1.6,4.1,8.6,1.53,3.68,6.93
Russia,Premier League,2015/2016,17/10/2015,12:00,CSKA Moscow,Ural,3,2,H,1.42,4.82,8.74,1.45,4.82,9.3,1.4,4.46,7.7
Russia,Premier League,2015/2016,17/10/2015,14:30,Amkar,Dynamo Moscow,1,1,D,3.51,3.25,2.31,3.8,3.3,2.4,3.38,3.14,2.19
Russia,Premier League,2015/2016,17/10/2015,14:30,Kuban,Zenit,2,2,D,4.64,3.84,1.82,5.3,3.84,1.83,4.55,3.55,1.76
Russia,Premier League,2015/2016,17/10/2015,17:00,Rubin Kazan,Ufa,3,1,H,1.74,3.74,5.48,1.77,3.8,5.5,1.71,3.54,4.96
Russia,Premier League,2015/2016,18/10/2015,11:30,Spartak Moscow,Lokomotiv Moscow,1,2,A,2.57,3.33,2.98,2.57,3.4,3.25,2.43,3.16,2.94
Russia,Premier League,2015/2016,18/10/2015,14:00,FK Krylya Sovetov Samara,Akhmat Grozny,0,2,A,2.82,3.14,2.84,2.82,3.3,3.06,2.66,3.02,2.74
Russia,Premier League,2015/2016,18/10/2015,16:30,FK Anzi Makhackala,Krasnodar,2,2,D,3.1,3.41,2.44,3.58,3.45,2.47,3.03,3.21,2.34
Russia,Premier League,2015/2016,19/10/2015,17:00,FK Rostov,M. Saransk,3,2,H,1.63,3.86,6.53,1.72,3.86,6.9,1.63,3.61,5.63
Russia,Premier League,2015/2016,23/10/2015,15:00,Ufa,FK Krylya Sovetov Samara,1,0,H,3.49,3.05,2.43,3.49,3.25,2.55,3.08,2.99,2.44
Russia,Premier League,2015/2016,24/10/2015,10:00,Ural,Amkar,3,1,H,2.1,3.23,4.18,2.14,3.45,4.6,2.01,3.16,3.91
Russia,Premier League,2015/2016,24/10/2015,12:30,M. Saransk,Kuban,1,1,D,2.95,3.24,2.65,3.11,3.24,2.74,2.92,3.08,2.48
Russia,Premier League,2015/2016,24/10/2015,15:00,Zenit,FK Anzi Makhackala,5,1,H,1.38,5.08,9.82,1.4,5.3,10.5,1.37,4.59,8.38
Russia,Premier League,2015/2016,25/10/2015,10:30,Dynamo Moscow,Spartak Moscow,2,3,A,3.01,3.33,2.54,3.26,3.45,2.62,2.85,3.2,2.46
Russia,Premier League,2015/2016,25/10/2015,13:30,Krasnodar,Rubin Kazan,2,1,H,1.72,3.75,5.63,1.85,3.75,5.63,1.73,3.45,4.9
Russia,Premier League,2015/2016,25/10/2015,16:00,Akhmat Grozny,CSKA Moscow,0,0,D,3.5,3.28,2.3,3.65,3.4,2.32,3.28,3.18,2.23
Russia,Premier League,2015/2016,26/10/2015,16:30,Lokomotiv Moscow,FK Rostov,0,2,A,1.96,3.31,4.7,2,3.55,5.68,1.85,3.27,4.54
Russia,Premier League,2015/2016,31/10/2015,11:30,CSKA Moscow,Ufa,2,0,H,1.25,6.07,16.98,1.3,6.5,16.98,1.25,5.41,12.4
Russia,Premier League,2015/2016,31/10/2015,14:00,Zenit,M. Saransk,0,0,D,1.26,5.92,16.29,1.27,6.8,21,1.23,5.71,13.47
Russia,Premier League,2015/2016,01/11/2015,11:00,FK Krylya Sovetov Samara,Krasnodar,0,4,A,3.31,3.22,2.42,3.55,3.32,2.47,3.13,3.08,2.35
Russia,Premier League,2015/2016,01/11/2015,13:30,FK Anzi Makhackala,Rubin Kazan,1,2,A,2.32,3.31,3.4,2.55,3.35,3.4,2.38,3.12,3.05
Russia,Premier League,2015/2016,01/11/2015,16:00,Kuban,Lokomotiv Moscow,6,2,H,3.49,3.29,2.3,3.7,3.3,2.38,3.33,3.13,2.22
Russia,Premier League,2015/2016,01/11/2015,16:30,Spartak Moscow,Ural,0,1,A,1.65,3.88,6.18,1.68,3.94,6.2,1.62,3.7,5.51
Russia,Premier League,2015/2016,02/11/2015,14:00,Amkar,Akhmat Grozny,1,0,H,3.54,3.11,2.38,3.6,3.2,2.47,3.3,2.97,2.33
Russia,Premier League,2015/2016,02/11/2015,16:30,FK Rostov,Dynamo Moscow,1,0,H,2.27,3.33,3.52,2.4,3.35,3.52,2.24,3.17,3.26
Russia,Premier League,2015/2016,06/11/2015,16:00,M. Saransk,FK Anzi Makhackala,4,0,H,2.64,3.11,3.08,2.72,3.2,3.25,2.54,3.03,2.89
Russia,Premier League,2015/2016,07/11/2015,11:00,Ural,FK Rostov,1,2,A,2.69,3.17,2.96,2.82,3.2,3.14,2.57,3.05,2.85
Russia,Premier League,2015/2016,07/11/2015,13:15,Ufa,Amkar,2,1,H,2.69,3.03,3.09,2.78,3.2,3.13,2.58,2.96,2.91
Russia,Premier League,2015/2016,07/11/2015,15:30,Dynamo Moscow,Kuban,2,1,H,2,3.32,4.45,2.12,3.32,4.45,1.99,3.24,3.88
Russia,Premier League,2015/2016,07/11/2015,16:30,Akhmat Grozny,Spartak Moscow,2,1,H,2.25,3.31,3.59,2.4,3.45,3.6,2.24,3.15,3.3
Russia,Premier League,2015/2016,08/11/2015,11:30,Rubin Kazan,FK Krylya Sovetov Samara,2,0,H,2.1,3.4,3.92,2.12,3.4,4.15,2.04,3.23,3.7
Russia,Premier League,2015/2016,08/11/2015,14:00,Krasnodar,CSKA Moscow,2,1,H,2.8,3.35,2.71,2.9,3.35,2.78,2.76,3.19,2.54
Russia,Premier League,2015/2016,08/11/2015,16:30,Lokomotiv Moscow,Zenit,2,0,H,3.99,3.45,2.06,4.25,3.55,2.2,3.68,3.23,2.04
Russia,Premier League,2015/2016,21/11/2015,09:00,Amkar,Rubin Kazan,1,2,A,3.12,3.13,2.57,3.25,3.2,2.66,2.92,3.03,2.5
Russia,Premier League,2015/2016,21/11/2015,11:00,CSKA Moscow,FK Krylya Sovetov Samara,0,2,A,1.4,4.62,10.6,1.42,4.9,10.6,1.38,4.35,8.63
Russia,Premier League,2015/2016,21/11/2015,13:30,Zenit,Ural,3,0,H,1.42,4.8,8.76,1.44,5.1,9.5,1.41,4.41,7.57
Russia,Premier League,2015/2016,21/11/2015,16:00,Lokomotiv Moscow,FK Anzi Makhackala,0,2,A,1.62,3.95,6.44,1.65,4.1,6.8,1.59,3.74,5.78
Russia,Premier League,2015/2016,22/11/2015,11:30,M. Saransk,Dynamo Moscow,1,1,D,3.16,3.23,2.51,3.35,3.25,2.57,3.04,3.11,2.37
Russia,Premier League,2015/2016,22/11/2015,14:00,Kuban,Akhmat Grozny,2,2,D,2.49,3.15,3.27,2.6,3.2,3.44,2.45,3.03,3.01
Russia,Premier League,2015/2016,22/11/2015,16:30,Spartak Moscow,Krasnodar,3,2,H,2.76,3.4,2.71,2.82,3.42,2.82,2.62,3.2,2.66
Russia,Premier League,2015/2016,23/11/2015,16:00,FK Rostov,Ufa,1,1,D,1.57,3.97,7.29,1.67,4.1,7.29,1.58,3.64,6.27
Russia,Premier League,2015/2016,27/11/2015,14:00,Ural,M. Saransk,3,1,H,1.96,3.5,4.34,1.97,3.55,4.5,1.9,3.3,4.13
Russia,Premier League,2015/2016,28/11/2015,09:30,Ufa,Kuban,2,2,D,2.88,3.22,2.72,3,3.32,2.8,2.83,3.05,2.56
Russia,Premier League,2015/2016,28/11/2015,12:00,FK Krylya Sovetov Samara,Amkar,0,0,D,2.05,3.25,4.37,2.2,3.4,4.6,2,3.08,4.1
Russia,Premier League,2015/2016,28/11/2015,14:30,Akhmat Grozny,Zenit,4,1,H,3.77,3.38,2.16,4,3.5,2.16,3.61,3.29,2.04
Russia,Premier League,2015/2016,29/11/2015,12:00,FK Anzi Makhackala,CSKA Moscow,1,1,D,4.03,3.65,1.99,4.45,3.7,2.05,3.76,3.43,1.95
Russia,Premier League,2015/2016,30/11/2015,16:00,Dynamo Moscow,Lokomotiv Moscow,2,2,D,2.9,3.13,2.77,3.19,3.25,2.8,2.77,3.04,2.63
Russia,Premier League,2015/2016,30/11/2015,16:00,Krasnodar,FK Rostov,2,1,H,1.93,3.53,4.55,1.93,3.72,5,1.82,3.41,4.38
Russia,Premier League,2015/2016,30/11/2015,16:15,Rubin Kazan,Spartak Moscow,2,2,D,2.87,3.41,2.62,3.22,3.48,2.78,2.68,3.26,2.56
Russia,Premier League,2015/2016,03/12/2015,14:00,Amkar,CSKA Moscow,2,0,H,5.32,3.63,1.78,5.4,3.65,1.9,4.73,3.4,1.77
Russia,Premier League,2015/2016,03/12/2015,16:00,M. Saransk,Akhmat Grozny,0,0,D,3.48,3.27,2.32,3.88,3.27,2.32,3.43,3.08,2.2
Russia,Premier League,2015/2016,03/12/2015,16:00,Zenit,Ufa,1,1,D,1.26,5.95,16.57,1.32,6.3,18,1.25,5.35,13.24
Russia,Premier League,2015/2016,04/12/2015,16:00,Dynamo Moscow,FK Anzi Makhackala,1,2,A,2.3,3.43,3.35,2.31,3.43,3.8,2.18,3.21,3.32
Russia,Premier League,2015/2016,04/12/2015,16:00,FK Rostov,Rubin Kazan,1,0,H,2.24,3.41,3.5,2.31,3.44,3.55,2.19,3.22,3.3
Russia,Premier League,2015/2016,04/12/2015,16:00,Kuban,Krasnodar,2,3,A,4.1,3.59,2,4.4,3.61,2.03,3.86,3.4,1.94
Russia,Premier League,2015/2016,04/12/2015,16:00,Lokomotiv Moscow,Ural,2,2,D,1.79,3.52,5.47,1.83,3.65,5.6,1.77,3.36,4.85
Russia,Premier League,2015/2016,04/12/2015,16:00,Spartak Moscow,FK Krylya Sovetov Samara,1,0,H,1.54,4.14,7.45,1.72,4.5,7.9,1.54,3.88,6.21
Russia,Premier League,2015/2016,05/03/2016,11:30,FK Krylya Sovetov Samara,FK Rostov,0,1,A,3.63,3.1,2.35,3.84,3.19,2.36,3.41,2.97,2.26
Russia,Premier League,2015/2016,05/03/2016,14:00,Rubin Kazan,Kuban,1,0,H,1.98,3.35,4.51,2.01,3.57,4.75,1.89,3.23,4.3
Russia,Premier League,2015/2016,05/03/2016,16:30,Krasnodar,Zenit,0,0,D,2.97,3.36,2.56,3.22,3.49,2.62,2.85,3.22,2.44
Russia,Premier League,2015/2016,06/03/2016,11:30,Ufa,M. Saransk,1,1,D,,,,2.68,3.19,3.6,2.46,2.94,3.09
Russia,Premier League,2015/2016,06/03/2016,14:00,Akhmat Grozny,Lokomotiv Moscow,2,1,H,,,,2.58,3.24,3.42,2.41,3,3.1
Russia,Premier League,2015/2016,06/03/2016,16:30,CSKA Moscow,Spartak Moscow,1,0,H,1.88,3.74,4.4,1.91,4.2,4.5,1.84,3.5,4.18
Russia,Premier League,2015/2016,07/03/2016,11:30,Ural,Dynamo Moscow,1,1,D,2.48,3.18,3.2,2.57,3.23,3.45,2.38,3.06,3.07
Russia,Premier League,2015/2016,07/03/2016,14:00,FK Anzi Makhackala,Amkar,0,1,A,2.26,3.07,3.88,2.3,3.2,4,2.17,3.03,3.58
Russia,Premier League,2015/2016,11/03/2016,16:00,Kuban,FK Krylya Sovetov Samara,2,0,H,2.37,3.05,3.64,2.4,3.15,3.8,2.24,2.97,3.47
Russia,Premier League,2015/2016,12/03/2016,11:30,Ural,FK Anzi Makhackala,4,2,H,2.15,3.18,4.07,2.25,3.25,4.08,2.14,3.09,3.57
Russia,Premier League,2015/2016,12/03/2016,14:00,Spartak Moscow,Amkar,2,1,H,1.75,3.67,5.52,1.8,3.8,5.9,1.71,3.51,4.98
Russia,Premier League,2015/2016,12/03/2016,16:30,FK Rostov,CSKA Moscow,2,0,H,3.55,3.13,2.36,3.85,3.3,2.36,3.47,3.06,2.19
Russia,Premier League,2015/2016,13/03/2016,11:30,M. Saransk,Krasnodar,0,1,A,3.89,3.41,2.11,5.1,3.56,2.11,3.96,3.25,1.96
Russia,Premier League,2015/2016,13/03/2016,14:00,Lokomotiv Moscow,Ufa,2,0,H,1.65,3.7,6.65,1.67,4.17,7.5,1.58,3.57,6.42
Russia,Premier League,2015/2016,13/03/2016,16:30,Zenit,Rubin Kazan,4,2,H,1.52,4.26,7.56,1.53,4.75,8.3,1.49,4.01,6.8
Russia,Premier League,2015/2016,14/03/2016,16:00,Dynamo Moscow,Akhmat Grozny,0,1,A,2.51,3.01,3.42,2.67,3.1,3.42,2.39,2.95,3.17
Russia,Premier League,2015/2016,18/03/2016,14:00,Amkar,FK Rostov,0,0,D,3.1,2.94,2.76,3.82,3,2.77,3.09,2.82,2.54
Russia,Premier League,2015/2016,18/03/2016,16:30,FK Anzi Makhackala,Spartak Moscow,0,4,A,3.93,3.4,2.1,4.6,3.54,2.22,3.58,3.22,2.08
Russia,Premier League,2015/2016,19/03/2016,11:30,Ufa,Dynamo Moscow,0,1,A,3.4,2.94,2.56,3.64,3.05,2.56,3.23,2.87,2.42
Russia,Premier League,2015/2016,19/03/2016,14:00,Akhmat Grozny,Ural,1,1,D,1.31,5.25,13.37,1.5,6.8,13.37,1.3,4.71,10.93
Russia,Premier League,2015/2016,19/03/2016,16:30,CSKA Moscow,Kuban,2,0,H,1.46,4.47,8.67,1.47,4.8,11,1.39,4.29,8.51
Russia,Premier League,2015/2016,20/03/2016,11:30,FK Krylya Sovetov Samara,Zenit,0,2,A,7.84,4.2,1.52,10,4.85,1.52,7.21,4,1.47
Russia,Premier League,2015/2016,20/03/2016,14:00,Rubin Kazan,M. Saransk,1,1,D,1.76,3.62,5.5,1.83,3.65,6.1,1.73,3.42,5.03
Russia,Premier League,2015/2016,20/03/2016,16:30,Krasnodar,Lokomotiv Moscow,1,2,A,2.27,3.3,3.55,2.4,3.3,3.65,2.21,3.13,3.34
Russia,Premier League,2015/2016,02/04/2016,10:00,Ural,Ufa,1,0,H,2.05,3.35,4.17,2.14,3.44,4.6,2.04,3.15,3.76
Russia,Premier League,2015/2016,02/04/2016,12:30,Akhmat Grozny,FK Anzi Makhackala,3,2,H,1.64,3.82,6.49,1.66,4.25,8,1.56,3.72,6.26
Russia,Premier League,2015/2016,02/04/2016,15:00,Kuban,Amkar,1,1,D,2.75,3.04,3.01,2.81,3.05,3.2,2.6,2.89,2.92
Russia,Premier League,2015/2016,02/04/2016,17:30,FK Rostov,Spartak Moscow,2,0,H,2.79,3.16,2.85,2.82,3.22,2.93,2.64,3.01,2.76
Russia,Premier League,2015/2016,03/04/2016,15:00,Lokomotiv Moscow,Rubin Kazan,1,0,H,1.95,3.46,4.5,1.96,3.5,4.95,1.89,3.3,4.15
Russia,Premier League,2015/2016,03/04/2016,17:30,Zenit,CSKA Moscow,2,0,H,2.03,3.32,4.31,2.08,3.6,4.55,1.98,3.24,3.9
Russia,Premier League,2015/2016,04/04/2016,17:00,M. Saransk,FK Krylya Sovetov Samara,1,2,A,2.32,3.08,3.7,2.38,3.1,3.82,2.29,2.95,3.39
Russia,Premier League,2015/2016,04/04/2016,17:30,Dynamo Moscow,Krasnodar,1,4,A,3.21,3.17,2.51,3.7,3.3,2.51,3.16,3.08,2.33
Russia,Premier League,2015/2016,08/04/2016,17:00,FK Anzi Makhackala,FK Rostov,0,0,D,3.9,3.16,2.21,4.9,3.45,2.26,3.71,3.09,2.1
Russia,Premier League,2015/2016,09/04/2016,11:30,CSKA Moscow,M. Saransk,7,1,H,1.33,5.18,12.13,1.36,6.6,18,1.31,4.83,10.72
Russia,Premier League,2015/2016,09/04/2016,12:30,Amkar,Zenit,0,2,A,5.53,3.59,1.77,6.5,3.91,1.77,5.44,3.52,1.66
Russia,Premier League,2015/2016,09/04/2016,17:30,Rubin Kazan,Dynamo Moscow,4,1,H,2.1,3.26,4.13,2.25,3.3,4.13,2.08,3.17,3.64
Russia,Premier League,2015/2016,10/04/2016,12:30,Ufa,Akhmat Grozny,1,0,H,4.16,3.21,2.11,4.55,3.3,2.15,3.83,3.08,2.06
Russia,Premier League,2015/2016,10/04/2016,15:00,Krasnodar,Ural,6,0,H,1.47,4.42,8.35,1.57,4.7,8.35,1.46,4.13,6.94
Russia,Premier League,2015/2016,10/04/2016,17:30,Spartak Moscow,Kuban,2,2,D,1.48,4.69,7.26,1.49,4.8,8.2,1.44,4.35,6.79
Russia,Premier League,2015/2016,11/04/2016,16:00,FK Krylya Sovetov Samara,Lokomotiv Moscow,0,0,D,3.47,3.19,2.36,3.55,3.25,2.44,3.31,2.98,2.3
Russia,Premier League,2015/2016,15/04/2016,17:00,M. Saransk,Amkar,1,1,D,2.94,3.13,2.73,3.26,3.16,2.75,2.81,3,2.61
Russia,Premier League,2015/2016,16/04/2016,12:30,Akhmat Grozny,Krasnodar,0,1,A,3.11,3.18,2.58,3.15,3.2,2.77,2.89,3.05,2.51
Russia,Premier League,2015/2016,16/04/2016,15:00,Lokomotiv Moscow,CSKA Moscow,1,1,D,3.43,3.1,2.43,3.72,3.25,2.43,3.24,3.01,2.31
Russia,Premier League,2015/2016,16/04/2016,17:30,Zenit,Spartak Moscow,5,2,H,1.53,4.56,6.66,1.65,4.75,7.01,1.5,4.24,5.99
Russia,Premier League,2015/2016,17/04/2016,12:30,Ufa,FK Anzi Makhackala,2,0,H,2.22,3.09,4.01,2.32,3.2,4.1,2.16,2.99,3.62
Russia,Premier League,2015/2016,17/04/2016,15:00,Dynamo Moscow,FK Krylya Sovetov Samara,0,1,A,2.08,3.25,4.21,2.1,3.38,4.65,2,3.16,3.93
Russia,Premier League,2015/2016,17/04/2016,17:30,Kuban,FK Rostov,0,1,A,4,3.23,2.15,4.19,3.23,2.25,3.64,3.09,2.11
Russia,Premier League,2015/2016,18/04/2016,15:00,Ural,Rubin Kazan,0,1,A,3.24,3.27,2.44,3.28,3.28,2.62,3.06,3.14,2.34
Russia,Premier League,2015/2016,23/04/2016,12:30,FK Krylya Sovetov Samara,Ural,1,1,D,2.11,3.26,4.11,2.2,3.3,4.3,2.05,3.15,3.76
Russia,Premier League,2015/2016,23/04/2016,15:00,Spartak Moscow,M. Saransk,2,2,D,1.44,4.93,7.81,1.51,5.36,7.81,1.44,4.37,6.75
Russia,Premier League,2015/2016,23/04/2016,17:30,Rubin Kazan,Akhmat Grozny,0,1,A,2.63,3.23,2.98,2.68,3.46,3.2,2.51,3.07,2.87
Russia,Premier League,2015/2016,24/04/2016,10:00,Amkar,Lokomotiv Moscow,0,1,A,3.34,3.11,2.48,3.75,3.15,2.48,3.36,2.97,2.28
Russia,Premier League,2015/2016,24/04/2016,12:30,Krasnodar,Ufa,4,0,H,1.36,4.83,12.18,1.42,5.2,12.18,1.36,4.44,9.19
Russia,Premier League,2015/2016,24/04/2016,15:00,CSKA Moscow,Dynamo Moscow,1,0,H,1.49,4.44,7.85,1.49,5.3,11,1.43,4.24,7.52
Russia,Premier League,2015/2016,24/04/2016,17:30,FK Anzi Makhackala,Kuban,1,0,H,2.51,3.32,3.08,2.59,3.32,3.35,2.39,3.15,2.98
Russia,Premier League,2015/2016,24/04/2016,17:30,FK Rostov,Zenit,3,0,H,3.62,3.23,2.28,4.15,3.4,2.29,3.41,3.12,2.19
Russia,Premier League,2015/2016,28/04/2016,15:00,Ural,CSKA Moscow,0,3,A,7.33,4.39,1.51,8.1,4.8,1.51,6.7,4.17,1.47
Russia,Premier League,2015/2016,28/04/2016,17:30,Zenit,Kuban,4,1,H,1.23,6.9,15.6,1.28,9.7,21,1.19,6.49,13.67
Russia,Premier League,2015/2016,29/04/2016,17:00,Dynamo Moscow,Amkar,0,0,D,2.03,3.3,4.35,2.14,3.3,4.45,2,3.12,3.98
Russia,Premier League,2015/2016,30/04/2016,17:30,Lokomotiv Moscow,Spartak Moscow,0,2,A,2.04,3.6,3.89,2.18,3.6,3.89,2.03,3.36,3.57
Russia,Premier League,2015/2016,01/05/2016,10:00,Ufa,Rubin Kazan,1,1,D,3.21,3.06,2.59,3.28,3.2,2.6,3.02,2.98,2.47
Russia,Premier League,2015/2016,01/05/2016,12:30,M. Saransk,FK Rostov,2,1,H,6.8,3.8,1.63,7.2,3.86,1.7,6.03,3.55,1.61
Russia,Premier League,2015/2016,01/05/2016,15:00,Akhmat Grozny,FK Krylya Sovetov Samara,0,1,A,1.76,3.36,6.27,1.79,3.75,6.5,1.7,3.33,5.51
Russia,Premier League,2015/2016,01/05/2016,17:30,Krasnodar,FK Anzi Makhackala,3,0,H,1.31,5.71,11.72,1.32,6.4,14,1.27,5.29,10.61
Russia,Premier League,2015/2016,06/05/2016,16:00,FK Krylya Sovetov Samara,Ufa,1,0,H,1.95,3.21,4.95,1.96,3.3,5.1,1.9,3.1,4.48
Russia,Premier League,2015/2016,06/05/2016,17:30,FK Rostov,Lokomotiv Moscow,2,1,H,2.14,3.14,4.16,2.35,3.2,4.16,2.16,2.97,3.69
Russia,Premier League,2015/2016,07/05/2016,12:30,CSKA Moscow,Akhmat Grozny,1,0,H,1.42,4.59,9.79,1.44,5.2,10,1.4,4.32,8.31
Russia,Premier League,2015/2016,07/05/2016,15:00,FK Anzi Makhackala,Zenit,0,1,A,11.27,5.4,1.33,14.5,6.35,1.33,9.96,5.13,1.3
Russia,Premier League,2015/2016,07/05/2016,15:00,Kuban,M. Saransk,1,2,A,2.19,3.37,3.67,2.23,3.37,3.82,2.13,3.2,3.45
Russia,Premier League,2015/2016,07/05/2016,17:30,Rubin Kazan,Krasnodar,1,1,D,4.44,3.76,1.88,4.8,3.9,2.08,4.22,3.45,1.84
Russia,Premier League,2015/2016,08/05/2016,12:30,Amkar,Ural,1,1,D,1.68,3.62,6.54,1.7,3.78,6.7,1.64,3.49,5.82
Russia,Premier League,2015/2016,08/05/2016,17:30,Spartak Moscow,Dynamo Moscow,3,0,H,1.71,3.98,5.3,1.75,4.05,5.4,1.68,3.74,4.8
Russia,Premier League,2015/2016,11/05/2016,15:00,Ufa,CSKA Moscow,1,3,A,12.11,5.02,1.35,14,5.6,1.36,9.86,4.62,1.33
Russia,Premier League,2015/2016,11/05/2016,17:00,Rubin Kazan,FK Anzi Makhackala,1,2,A,2.28,3.43,3.39,2.36,3.72,3.96,2.2,3.26,3.23
Russia,Premier League,2015/2016,11/05/2016,17:30,Krasnodar,FK Krylya Sovetov Samara,3,0,H,1.3,5.54,13.01,1.33,5.9,15.5,1.29,4.93,10.76
Russia,Premier League,2015/2016,11/05/2016,17:30,Lokomotiv Moscow,Kuban,0,1,A,1.52,4.27,7.54,1.54,4.85,9.1,1.48,4.02,6.88
Russia,Premier League,2015/2016,11/05/2016,17:30,M. Saransk,Zenit,0,3,A,8.01,4.8,1.44,15.5,6.2,1.45,7.95,4.58,1.38
Russia,Premier League,2015/2016,12/05/2016,15:00,Ural,Spartak Moscow,0,1,A,5.67,4,1.67,5.67,4.5,1.7,5.09,3.83,1.63
Russia,Premier League,2015/2016,12/05/2016,17:00,Akhmat Grozny,Amkar,2,0,H,2.27,3.1,3.82,2.27,3.2,4.05,2.17,3.02,3.6
Russia,Premier League,2015/2016,12/05/2016,17:30,Dynamo Moscow,FK Rostov,1,3,A,3.84,3.35,2.15,4,3.4,2.17,3.65,3.19,2.07
Russia,Premier League,2015/2016,15/05/2016,12:30,FK Krylya Sovetov Samara,Rubin Kazan,1,1,D,2.76,3.25,2.81,2.88,3.25,2.88,2.68,3.03,2.71
Russia,Premier League,2015/2016,15/05/2016,15:00,FK Anzi Makhackala,M. Saransk,3,0,H,2.29,3.27,3.55,2.35,3.52,3.6,2.21,3.2,3.26
Russia,Premier League,2015/2016,15/05/2016,17:00,Zenit,Lokomotiv Moscow,1,1,D,1.33,5.34,11.88,1.44,5.7,17.5,1.29,4.99,10.93
Russia,Premier League,2015/2016,16/05/2016,15:00,Amkar,Ufa,1,0,H,1.98,3.24,4.72,2.05,3.3,5,1.9,3.08,4.53
Russia,Premier League,2015/2016,16/05/2016,17:30,CSKA Moscow,Krasnodar,2,0,H,1.69,3.95,5.58,1.75,4.1,5.76,1.66,3.7,5.12
Russia,Premier League,2015/2016,16/05/2016,17:30,FK Rostov,Ural,1,0,H,1.22,6.89,17.36,1.26,7.2,18.57,1.21,5.93,14.36
Russia,Premier League,2015/2016,16/05/2016,17:30,Kuban,Dynamo Moscow,1,0,H,2.62,3.42,2.84,2.71,3.56,2.9,2.49,3.22,2.79
Russia,Premier League,2015/2016,16/05/2016,17:30,Spartak Moscow,Akhmat Grozny,3,0,H,1.64,4.1,5.87,1.73,4.1,6.05,1.63,3.7,5.43
Russia,Premier League,2015/2016,21/05/2016,11:30,Akhmat Grozny,FK Rostov,0,2,A,5.81,3.92,1.67,6.4,4.55,1.71,5.23,3.64,1.66
Russia,Premier League,2015/2016,21/05/2016,11:30,Dynamo Moscow,Zenit,0,3,A,2.77,3.61,2.59,2.97,3.85,2.6,2.66,3.42,2.48
Russia,Premier League,2015/2016,21/05/2016,11:30,FK Krylya Sovetov Samara,FK Anzi Makhackala,0,0,D,5.63,3.91,1.69,5.9,4.45,1.83,4.9,3.62,1.7
Russia,Premier League,2015/2016,21/05/2016,11:30,Krasnodar,Amkar,1,0,H,1.3,5.87,11.54,1.33,6.3,15,1.28,5.27,10.25
Russia,Premier League,2015/2016,21/05/2016,11:30,Lokomotiv Moscow,M. Saransk,3,0,H,2.3,3.74,3.11,2.4,4,3.42,2.26,3.5,2.92
Russia,Premier League,2015/2016,21/05/2016,11:30,Rubin Kazan,CSKA Moscow,0,1,A,11.13,5.63,1.32,15.5,6.5,1.34,9.73,5.06,1.3
Russia,Premier League,2015/2016,21/05/2016,11:30,Ufa,Spartak Moscow,3,1,H,2.53,3.98,2.64,2.81,4.1,2.68,2.51,3.48,2.57
Russia,Premier League,2015/2016,21/05/2016,11:30,Ural,Kuban,2,0,H,5.87,4.4,1.59,6.5,4.68,1.62,5.58,3.98,1.56
Russia,Premier League,2015/2016,24/05/2016,16:00,Volgar-Astrakhan,FK Anzi Makhackala,0,1,A,3.17,3.07,2.6,3.42,3.2,2.6,3.06,2.98,2.44
Russia,Premier League,2015/2016,24/05/2016,17:45,Kuban,Tomsk,1,0,H,2.52,3.12,3.24,2.52,3.2,3.44,2.39,2.98,3.14
Russia,Premier League,2015/2016,27/05/2016,14:00,Tomsk,Kuban,2,0,H,2.08,3.32,4.1,2.21,3.32,4.1,2.08,3.14,3.66
Russia,Premier League,2015/2016,27/05/2016,17:00,FK Anzi Makhackala,Volgar-Astrakhan,2,0,H,1.5,4.12,6.52,1.51,4.85,9.1,1.46,4.05,7.14
Russia,Premier League,2016/2017,30/07/2016,15:30,Zenit,Lokomotiv Moscow,0,0,D,1.83,3.57,5.09,1.84,3.88,5.7,1.77,3.49,4.67
Russia,Premier League,2016/2017,30/07/2016,18:00,FK Anzi Makhackala,CSKA Moscow,0,0,D,5.72,3.69,1.72,6,3.75,1.79,5.17,3.51,1.7
Russia,Premier League,2016/2017,30/07/2016,19:30,FK Rostov,Orenburg,1,0,H,1.99,3.31,4.56,2.02,3.58,5,1.9,3.21,4.32
Russia,Premier League,2016/2017,31/07/2016,13:30,Ural,Ufa,2,0,H,2.31,3.14,3.65,2.43,3.15,3.9,2.29,2.98,3.36
Russia,Premier League,2016/2017,31/07/2016,16:00,Spartak Moscow,Arsenal Tula,4,0,H,1.51,4.39,7.47,1.56,4.46,7.6,1.51,4.03,6.43
Russia,Premier League,2016/2017,31/07/2016,18:30,Akhmat Grozny,FK Krylya Sovetov Samara,1,0,H,2.03,3.16,4.62,2.05,3.45,5.95,1.92,3.13,4.45
Russia,Premier League,2016/2017,01/08/2016,17:30,Krasnodar,Tomsk,3,0,H,1.4,4.98,9.25,1.4,5.6,13,1.33,4.82,9.04
Russia,Premier League,2016/2017,01/08/2016,17:30,Rubin Kazan,Amkar,0,0,D,1.88,3.35,5.14,1.96,3.45,5.7,1.82,3.23,4.77
Russia,Premier League,2016/2017,06/08/2016,15:00,Ufa,Zenit,0,0,D,8.67,4.51,1.45,10,4.95,1.53,7.51,4.08,1.45
Russia,Premier League,2016/2017,06/08/2016,17:30,Arsenal Tula,Rubin Kazan,1,0,H,3.62,3.28,2.25,4.25,3.3,2.32,3.36,3.17,2.2
Russia,Premier League,2016/2017,07/08/2016,14:00,Orenburg,CSKA Moscow,0,1,A,6.58,3.7,1.66,6.61,3.85,1.7,5.69,3.59,1.64
Russia,Premier League,2016/2017,07/08/2016,14:30,Amkar,FK Anzi Makhackala,2,0,H,2.01,3.23,4.59,2.2,3.23,4.65,1.99,3.06,4.16
Russia,Premier League,2016/2017,07/08/2016,17:00,Lokomotiv Moscow,Tomsk,2,2,D,1.49,4.18,8.92,1.51,4.25,10,1.44,3.98,8.06
Russia,Premier League,2016/2017,07/08/2016,19:30,FK Rostov,Ural,0,0,D,1.81,3.29,5.94,1.95,3.35,5.94,1.81,3.2,5
Russia,Premier League,2016/2017,08/08/2016,17:30,Krasnodar,Akhmat Grozny,4,0,H,1.6,3.9,6.9,1.66,3.97,7.4,1.58,3.69,6.11
Russia,Premier League,2016/2017,08/08/2016,17:30,Spartak Moscow,FK Krylya Sovetov Samara,1,0,H,1.5,4.41,7.72,1.54,4.7,8.5,1.46,4.21,6.98
Russia,Premier League,2016/2017,12/08/2016,17:30,Zenit,FK Rostov,3,2,H,1.48,4.23,8.77,1.51,4.6,9.31,1.46,4.02,7.59
Russia,Premier League,2016/2017,13/08/2016,13:30,Ural,CSKA Moscow,0,1,A,4.83,3.45,1.89,4.95,3.6,2.06,4.13,3.27,1.92
Russia,Premier League,2016/2017,13/08/2016,16:00,FK Krylya Sovetov Samara,Krasnodar,1,1,D,6.73,3.69,1.65,7.5,3.79,1.7,5.89,3.59,1.62
Russia,Premier League,2016/2017,13/08/2016,18:30,Rubin Kazan,Spartak Moscow,1,1,D,2.98,3.41,2.52,3.06,3.41,2.6,2.84,3.21,2.47
Russia,Premier League,2016/2017,14/08/2016,13:30,Tomsk,Ufa,1,0,H,2.33,3.01,3.79,2.35,3.1,4.06,2.26,2.92,3.52
Russia,Premier League,2016/2017,14/08/2016,18:00,FK Anzi Makhackala,Arsenal Tula,1,0,H,2.33,3.1,3.65,2.37,3.12,3.75,2.23,3.01,3.47
Russia,Premier League,2016/2017,14/08/2016,18:30,Akhmat Grozny,Lokomotiv Moscow,1,1,D,2.54,3.01,3.35,2.62,3.1,3.46,2.45,2.93,3.13
Russia,Premier League,2016/2017,15/08/2016,15:30,Orenburg,Amkar,0,0,D,2.85,2.85,3.09,2.95,2.9,3.17,2.72,2.77,2.95
Russia,Premier League,2016/2017,19/08/2016,17:30,Rubin Kazan,FK Anzi Makhackala,1,2,A,1.67,3.7,6.45,1.76,3.8,6.6,1.66,3.48,5.72
Russia,Premier League,2016/2017,20/08/2016,12:30,Ufa,Akhmat Grozny,1,3,A,3.34,2.85,2.67,3.34,3,2.77,3.11,2.8,2.56
Russia,Premier League,2016/2017,20/08/2016,15:00,Zenit,CSKA Moscow,1,1,D,2.29,3.26,3.56,2.43,3.32,3.75,2.18,3.18,3.38
Russia,Premier League,2016/2017,20/08/2016,19:30,FK Rostov,Tomsk,3,0,H,2.08,3.09,4.54,2.2,3.2,4.65,2.03,3.02,4.11
Russia,Premier League,2016/2017,21/08/2016,13:30,Amkar,Ural,1,0,H,2.2,3.04,4.15,2.31,3.1,4.15,2.15,2.96,3.78
Russia,Premier League,2016/2017,21/08/2016,16:00,Spartak Moscow,Krasnodar,2,0,H,2.48,3.64,2.84,2.72,3.64,3.05,2.42,3.43,2.74
Russia,Premier League,2016/2017,21/08/2016,18:30,Lokomotiv Moscow,FK Krylya Sovetov Samara,0,0,D,1.58,3.75,7.94,1.68,3.82,7.94,1.56,3.62,6.65
Russia,Premier League,2016/2017,22/08/2016,17:30,Arsenal Tula,Orenburg,0,0,D,2.88,2.86,3.05,2.88,3,3.3,2.58,2.84,3.04
Russia,Premier League,2016/2017,26/08/2016,16:30,FK Krylya Sovetov Samara,Ufa,0,1,A,2.2,3.02,4.12,2.23,3.03,4.9,2.1,2.93,3.99
Russia,Premier League,2016/2017,27/08/2016,11:00,Orenburg,Rubin Kazan,1,1,D,2.95,2.89,2.93,3.12,3,2.93,2.86,2.85,2.71
Russia,Premier League,2016/2017,27/08/2016,13:30,Tomsk,CSKA Moscow,0,1,A,5.07,3.7,1.69,6.6,3.9,1.72,5.45,3.55,1.66
Russia,Premier League,2016/2017,27/08/2016,16:00,Zenit,Amkar,3,0,H,1.38,4.59,11.7,1.42,4.75,12.5,1.37,4.28,9.38
Russia,Premier League,2016/2017,28/08/2016,15:00,Ural,Arsenal Tula,1,1,D,2.07,3.15,4.44,2.1,3.25,4.8,2,3.06,4.14
Russia,Premier League,2016/2017,28/08/2016,17:15,Akhmat Grozny,FK Rostov,2,1,H,2.41,3.08,3.44,2.47,3.13,3.72,2.3,2.97,3.38
Russia,Premier League,2016/2017,28/08/2016,17:15,Krasnodar,Lokomotiv Moscow,1,2,A,2.01,3.49,4.22,2.04,3.49,4.36,1.95,3.27,4.04
Russia,Premier League,2016/2017,28/08/2016,19:30,FK Anzi Makhackala,Spartak Moscow,0,2,A,4.7,3.64,1.86,4.79,3.64,1.91,4.36,3.42,1.83
Russia,Premier League,2016/2017,09/09/2016,18:00,FK Rostov,FK Krylya Sovetov Samara,2,1,H,1.9,3.35,5.01,1.9,3.42,6,1.79,3.23,4.97
Russia,Premier League,2016/2017,10/09/2016,13:30,Amkar,Tomsk,1,0,H,1.94,3.22,4.98,1.99,3.22,5.05,1.91,3.09,4.5
Russia,Premier League,2016/2017,10/09/2016,16:00,Orenburg,FK Anzi Makhackala,0,0,D,2.24,3,4.06,2.43,3.07,4.06,2.2,2.91,3.68
Russia,Premier League,2016/2017,10/09/2016,18:30,CSKA Moscow,Akhmat Grozny,3,0,H,1.51,4.08,8.44,1.55,4.08,8.5,1.49,3.85,7.24
Russia,Premier League,2016/2017,11/09/2016,12:00,Ufa,Krasnodar,0,0,D,5.19,3.56,1.81,5.9,3.7,1.86,4.82,3.42,1.76
Russia,Premier League,2016/2017,11/09/2016,14:30,Spartak Moscow,Lokomotiv Moscow,1,0,H,2.25,3.44,3.44,2.3,3.47,3.58,2.2,3.27,3.26
Russia,Premier League,2016/2017,11/09/2016,17:00,Arsenal Tula,Zenit,0,5,A,7.95,4.22,1.51,8.9,4.65,1.51,7.12,4.12,1.46
Russia,Premier League,2016/2017,12/09/2016,17:30,Rubin Kazan,Ural,3,1,H,1.73,3.52,6.13,1.77,3.62,6.2,1.7,3.38,5.45
Russia,Premier League,2016/2017,16/09/2016,15:00,Orenburg,Spartak Moscow,1,3,A,5.57,3.36,1.83,5.9,3.56,1.92,4.71,3.31,1.81
Russia,Premier League,2016/2017,17/09/2016,12:00,Tomsk,Arsenal Tula,1,0,H,2.03,3.28,4.39,2.09,3.37,4.82,1.99,3.13,4.04
Russia,Premier League,2016/2017,17/09/2016,14:30,Ural,FK Anzi Makhackala,0,1,A,2.17,3.18,4.02,2.24,3.2,4.4,2.11,3.08,3.72
Russia,Premier League,2016/2017,17/09/2016,17:00,Akhmat Grozny,Amkar,1,3,A,2,3.13,4.85,2.11,3.13,5,1.98,2.98,4.4
Russia,Premier League,2016/2017,17/09/2016,17:00,Lokomotiv Moscow,Ufa,0,1,A,1.53,3.96,8.41,1.53,4.06,9.6,1.48,3.83,7.73
Russia,Premier League,2016/2017,18/09/2016,15:15,FK Krylya Sovetov Samara,CSKA Moscow,1,2,A,5.55,3.88,1.7,6,4.15,1.72,5.26,3.63,1.66
Russia,Premier League,2016/2017,18/09/2016,18:00,Krasnodar,FK Rostov,2,1,H,1.83,3.66,4.82,1.87,3.7,5,1.79,3.51,4.48
Russia,Premier League,2016/2017,19/09/2016,17:30,Zenit,Rubin Kazan,4,1,H,1.45,4.62,8.51,1.51,4.85,9.11,1.41,4.44,7.4
Russia,Premier League,2016/2017,24/09/2016,15:00,CSKA Moscow,Krasnodar,1,1,D,1.84,3.61,4.91,1.9,3.62,5.4,1.8,3.41,4.56
Russia,Premier League,2016/2017,24/09/2016,19:30,FK Rostov,Lokomotiv Moscow,1,0,H,2.73,3.04,2.99,2.92,3.07,3.05,2.64,2.91,2.88
Russia,Premier League,2016/2017,25/09/2016,10:00,Orenburg,Ural,0,1,A,2.12,2.98,4.61,2.47,3.02,4.85,2.14,2.89,3.97
Russia,Premier League,2016/2017,25/09/2016,12:30,Arsenal Tula,Akhmat Grozny,0,0,D,3.2,3.01,2.63,3.32,3.02,2.7,3.02,2.92,2.53
Russia,Premier League,2016/2017,25/09/2016,15:00,Spartak Moscow,Ufa,0,1,A,1.37,4.9,11.14,1.4,5.15,11.39,1.35,4.62,9.09
Russia,Premier League,2016/2017,25/09/2016,17:30,FK Anzi Makhackala,Zenit,2,2,D,7.52,4.4,1.51,9.31,4.76,1.51,7.09,4.18,1.45
Russia,Premier League,2016/2017,26/09/2016,15:00,Amkar,FK Krylya Sovetov Samara,0,0,D,2.03,3.05,4.88,2.04,3.2,5.2,1.96,2.97,4.49
Russia,Premier League,2016/2017,26/09/2016,17:30,Rubin Kazan,Tomsk,2,1,H,1.65,3.65,6.95,1.69,3.76,7.3,1.63,3.54,5.85
Russia,Premier League,2016/2017,01/10/2016,10:00,Tomsk,Ural,1,1,D,2.41,2.9,3.77,2.46,3.1,3.85,2.3,2.88,3.5
Russia,Premier League,2016/2017,01/10/2016,12:30,FK Krylya Sovetov Samara,FK Anzi Makhackala,2,1,H,2.3,3.02,3.87,2.3,3.35,3.87,2.21,3.01,3.52
Russia,Premier League,2016/2017,01/10/2016,15:00,Lokomotiv Moscow,Arsenal Tula,1,1,D,1.46,4.21,9.68,1.51,4.4,9.68,1.44,3.97,8.26
Russia,Premier League,2016/2017,01/10/2016,17:30,Akhmat Grozny,Orenburg,2,1,H,1.95,3.01,5.53,1.98,3.2,5.9,1.91,2.98,4.79
Russia,Premier League,2016/2017,02/10/2016,12:00,Ufa,Amkar,1,1,D,3.05,2.82,2.91,3.07,2.9,3.08,2.87,2.74,2.81
Russia,Premier League,2016/2017,02/10/2016,14:30,Zenit,Spartak Moscow,4,2,H,1.71,4.01,5.25,1.71,4.33,5.5,1.65,3.91,4.83
Russia,Premier League,2016/2017,02/10/2016,17:00,FK Rostov,CSKA Moscow,2,0,H,3.24,3.02,2.6,3.45,3.12,2.63,3.09,2.96,2.46
Russia,Premier League,2016/2017,02/10/2016,17:00,Krasnodar,Rubin Kazan,1,0,H,1.92,3.55,4.64,1.95,3.62,5,1.87,3.41,4.17
Russia,Premier League,2016/2017,14/10/2016,17:30,CSKA Moscow,Ufa,1,0,H,1.52,3.96,8.76,1.59,4.45,10,1.45,4.01,7.98
Russia,Premier League,2016/2017,15/10/2016,12:30,Amkar,Lokomotiv Moscow,0,0,D,3.26,2.89,2.69,3.38,2.92,2.81,3.05,2.78,2.61
Russia,Premier League,2016/2017,15/10/2016,15:00,Rubin Kazan,FK Krylya Sovetov Samara,3,0,H,1.72,3.61,5.95,1.73,3.65,6.6,1.67,3.46,5.54
Russia,Premier League,2016/2017,15/10/2016,17:30,Spartak Moscow,FK Rostov,1,0,H,1.83,3.58,5.03,2,3.74,5.03,1.84,3.41,4.31
Russia,Premier League,2016/2017,16/10/2016,12:00,Ural,Zenit,0,2,A,7.01,4.39,1.53,8.9,4.9,1.54,6.65,4.16,1.47
Russia,Premier League,2016/2017,16/10/2016,14:30,Orenburg,Tomsk,3,1,H,2.24,2.96,4.15,2.27,3.08,4.35,2.16,2.89,3.86
Russia,Premier League,2016/2017,16/10/2016,17:00,Arsenal Tula,Krasnodar,0,0,D,4.63,3.51,1.91,5.1,3.65,1.92,4.34,3.36,1.85
Russia,Premier League,2016/2017,17/10/2016,17:30,FK Anzi Makhackala,Akhmat Grozny,0,0,D,3.13,2.94,2.73,3.17,3,2.92,2.94,2.87,2.63
Russia,Premier League,2016/2017,21/10/2016,16:00,FK Krylya Sovetov Samara,Arsenal Tula,1,1,D,2.05,3.16,4.51,2.13,3.27,4.51,2.04,3.03,4.03
Russia,Premier League,2016/2017,22/10/2016,10:00,Tomsk,FK Anzi Makhackala,0,3,A,2.55,3.04,3.29,2.55,3.1,3.5,2.39,2.93,3.22
Russia,Premier League,2016/2017,22/10/2016,12:30,Ufa,FK Rostov,0,0,D,2.99,2.77,3.02,3.16,2.9,3.02,2.89,2.79,2.74
Russia,Premier League,2016/2017,22/10/2016,15:00,Ural,Spartak Moscow,0,1,A,4.24,3.35,2.04,4.72,3.47,2.07,3.98,3.21,1.98
Russia,Premier League,2016/2017,22/10/2016,17:30,Akhmat Grozny,Rubin Kazan,3,1,H,2.74,3.05,3.01,2.81,3.1,3.2,2.58,2.95,2.91
Russia,Premier League,2016/2017,23/10/2016,14:30,Lokomotiv Moscow,CSKA Moscow,1,0,H,3.01,3.03,2.75,3.26,3.1,2.84,2.88,2.94,2.63
Russia,Premier League,2016/2017,23/10/2016,17:00,Krasnodar,Amkar,1,0,H,1.72,3.58,6.07,1.75,3.62,6.4,1.69,3.44,5.36
Russia,Premier League,2016/2017,24/10/2016,17:30,Zenit,Orenburg,1,0,H,1.21,6.76,18.83,1.25,6.9,19,1.21,6.06,13.65
Russia,Premier League,2016/2017,29/10/2016,13:30,Amkar,FK Rostov,1,0,H,2.2,2.93,4.32,2.53,3,4.46,2.21,2.84,3.8
Russia,Premier League,2016/2017,29/10/2016,16:00,Spartak Moscow,CSKA Moscow,3,1,H,2.31,3.23,3.55,2.38,3.37,3.74,2.22,3.15,3.35
Russia,Premier League,2016/2017,30/10/2016,09:00,Ural,Akhmat Grozny,1,4,A,4.66,3.24,1.99,4.66,3.24,2.44,3.64,3.02,2.17
Russia,Premier League,2016/2017,30/10/2016,11:30,Arsenal Tula,Ufa,0,2,A,2.74,2.8,3.3,2.79,2.94,3.38,2.57,2.8,3.11
Russia,Premier League,2016/2017,30/10/2016,14:00,Zenit,Tomsk,1,0,H,1.17,7.94,21.01,1.19,8.2,24.76,1.16,6.93,16.8
Russia,Premier League,2016/2017,30/10/2016,16:30,FK Anzi Makhackala,Krasnodar,0,0,D,3.5,3.19,2.35,3.62,3.27,2.44,3.34,3.1,2.24
Russia,Premier League,2016/2017,31/10/2016,14:00,Orenburg,FK Krylya Sovetov Samara,1,0,H,2.41,2.92,3.73,2.49,3.1,3.8,2.33,2.84,3.47
Russia,Premier League,2016/2017,31/10/2016,16:30,Rubin Kazan,Lokomotiv Moscow,2,0,H,2.87,3.05,2.87,2.87,3.07,3.07,2.63,2.92,2.88
Russia,Premier League,2016/2017,05/11/2016,08:00,Tomsk,Spartak Moscow,0,1,A,5.43,3.65,1.76,5.7,3.65,1.81,4.9,3.46,1.74
Russia,Premier League,2016/2017,05/11/2016,10:30,Ufa,Rubin Kazan,2,3,A,3.18,2.88,2.75,3.42,2.96,2.78,3.02,2.82,2.61
Russia,Premier League,2016/2017,05/11/2016,13:00,FK Krylya Sovetov Samara,Ural,2,2,D,2.4,3,3.65,2.4,3.01,3.87,2.26,2.92,3.52
Russia,Premier League,2016/2017,05/11/2016,15:30,Lokomotiv Moscow,FK Anzi Makhackala,4,0,H,1.64,3.53,7.54,1.76,3.65,7.54,1.61,3.44,6.34
Russia,Premier League,2016/2017,06/11/2016,14:00,Akhmat Grozny,Zenit,2,1,H,5.17,3.67,1.79,5.35,3.78,1.82,4.73,3.49,1.75
Russia,Premier League,2016/2017,06/11/2016,14:00,FK Rostov,Arsenal Tula,4,1,H,1.61,3.73,7.36,1.7,3.75,7.6,1.61,3.49,6.3
Russia,Premier League,2016/2017,06/11/2016,16:00,CSKA Moscow,Amkar,2,2,D,1.65,3.7,6.75,1.69,3.7,7.8,1.62,3.45,6.12
Russia,Premier League,2016/2017,06/11/2016,16:30,Krasnodar,Orenburg,3,3,D,1.59,3.78,7.55,1.6,3.98,8.2,1.54,3.66,6.76
Russia,Premier League,2016/2017,18/11/2016,16:00,Arsenal Tula,CSKA Moscow,0,1,A,5.43,3.76,1.74,7.1,3.76,1.74,5.85,3.52,1.64
Russia,Premier League,2016/2017,18/11/2016,16:30,Rubin Kazan,FK Rostov,0,0,D,2.18,3.19,3.94,2.24,3.19,4.25,2.1,3.05,3.8
Russia,Premier League,2016/2017,19/11/2016,11:30,Orenburg,Lokomotiv Moscow,1,1,D,3.27,2.83,2.73,3.88,3,2.73,3.25,2.83,2.46
Russia,Premier League,2016/2017,19/11/2016,14:00,FK Anzi Makhackala,Ufa,0,1,A,2.16,3.08,4.23,2.2,3.12,4.45,2.11,2.97,3.88
Russia,Premier League,2016/2017,20/11/2016,11:30,Krasnodar,Ural,3,0,H,1.42,4.74,9.25,1.45,4.74,9.51,1.4,4.35,8.11
Russia,Premier League,2016/2017,20/11/2016,14:00,Spartak Moscow,Amkar,1,0,H,1.57,3.95,7.35,1.62,3.97,8.52,1.54,3.72,6.77
Russia,Premier League,2016/2017,20/11/2016,16:30,Zenit,FK Krylya Sovetov Samara,3,1,H,1.33,5.52,11.08,1.35,6.55,11.89,1.3,5.22,9.32
Russia,Premier League,2016/2017,21/11/2016,16:00,Akhmat Grozny,Tomsk,0,0,D,1.34,4.95,13.14,1.45,5.2,14,1.34,4.52,10.43
Russia,Premier League,2016/2017,25/11/2016,14:00,Ufa,Orenburg,1,0,H,2.47,2.82,3.76,2.55,2.92,3.86,2.42,2.72,3.47
Russia,Premier League,2016/2017,26/11/2016,08:30,Amkar,Arsenal Tula,1,0,H,1.8,3.26,6.12,1.82,3.31,6.8,1.73,3.18,5.72
Russia,Premier League,2016/2017,26/11/2016,11:00,CSKA Moscow,Rubin Kazan,0,0,D,1.74,3.58,5.9,1.77,3.6,6.2,1.7,3.41,5.4
Russia,Premier League,2016/2017,26/11/2016,14:00,Lokomotiv Moscow,Ural,1,1,D,1.53,3.88,8.72,1.55,4.02,8.92,1.5,3.73,7.55
Russia,Premier League,2016/2017,26/11/2016,15:00,Akhmat Grozny,Spartak Moscow,0,1,A,3.26,3.12,2.51,3.3,3.22,2.56,2.99,3.08,2.44
Russia,Premier League,2016/2017,27/11/2016,11:00,FK Krylya Sovetov Samara,Tomsk,3,0,H,1.7,3.48,6.68,1.95,3.64,7.6,1.7,3.33,5.61
Russia,Premier League,2016/2017,27/11/2016,13:30,FK Rostov,FK Anzi Makhackala,2,0,H,1.91,3.27,5.08,1.91,3.44,6.2,1.81,3.19,4.92
Russia,Premier League,2016/2017,27/11/2016,16:00,Krasnodar,Zenit,2,1,H,3.06,3.31,2.52,3.24,3.35,2.54,2.92,3.2,2.41
Russia,Premier League,2016/2017,30/11/2016,14:00,Ural,FK Rostov,1,0,H,1.71,3.53,6.25,2.83,3.74,6.6,1.73,3.35,5.53
Russia,Premier League,2016/2017,30/11/2016,16:00,Rubin Kazan,Arsenal Tula,1,0,H,1.58,3.96,7.17,1.59,4.05,8,1.54,3.74,6.6
Russia,Premier League,2016/2017,30/11/2016,16:30,CSKA Moscow,Orenburg,2,0,H,1.65,3.59,7.12,1.67,3.75,8.12,1.58,3.51,6.65
Russia,Premier League,2016/2017,30/11/2016,16:30,Zenit,Ufa,2,0,H,1.35,4.73,13.45,1.39,5.17,15,1.33,4.53,10.59
Russia,Premier League,2016/2017,01/12/2016,15:00,Akhmat Grozny,Krasnodar,2,1,H,3.56,3.01,2.43,3.65,3.02,2.6,3.26,2.92,2.38
Russia,Premier League,2016/2017,01/12/2016,15:00,FK Krylya Sovetov Samara,Spartak Moscow,4,0,H,4.76,3.37,1.93,5,3.4,2.04,4.32,3.23,1.89
Russia,Premier League,2016/2017,01/12/2016,16:30,Tomsk,Lokomotiv Moscow,1,6,A,11.69,4.94,1.36,12.88,5.55,1.38,10.37,4.74,1.32
Russia,Premier League,2016/2017,01/12/2016,17:30,FK Anzi Makhackala,Amkar,3,1,H,2.77,2.86,3.18,2.89,2.9,3.27,2.66,2.76,3.01
Russia,Premier League,2016/2017,03/12/2016,11:00,CSKA Moscow,Ural,4,0,H,1.52,4.24,7.69,1.53,4.34,9.64,1.45,4.03,7.41
Russia,Premier League,2016/2017,03/12/2016,16:00,FK Rostov,Zenit,0,0,D,3.27,3.3,2.4,3.6,3.38,2.48,3.15,3.13,2.33
Russia,Premier League,2016/2017,04/12/2016,13:00,Lokomotiv Moscow,Akhmat Grozny,2,0,H,2.06,3.14,4.52,2.18,3.14,4.52,2.02,3.02,4.11
Russia,Premier League,2016/2017,05/12/2016,10:00,Ufa,Tomsk,1,0,H,1.63,3.5,8,1.63,3.64,8.52,1.58,3.39,7.06
Russia,Premier League,2016/2017,05/12/2016,11:00,Amkar,Orenburg,3,0,H,2.09,2.95,4.83,2.14,3.02,5.4,2.03,2.84,4.49
Russia,Premier League,2016/2017,05/12/2016,16:00,Krasnodar,FK Krylya Sovetov Samara,1,1,D,1.63,3.8,6.69,1.65,4.1,7,1.59,3.73,5.91
Russia,Premier League,2016/2017,05/12/2016,16:30,Arsenal Tula,FK Anzi Makhackala,1,0,H,2.89,2.88,3.01,2.98,3.02,3.15,2.7,2.79,2.94
Russia,Premier League,2016/2017,05/12/2016,16:30,Spartak Moscow,Rubin Kazan,2,1,H,1.62,3.75,7.03,1.68,3.81,7.03,1.6,3.62,5.95
Russia,Premier League,2016/2017,03/03/2017,16:00,Tomsk,FK Rostov,0,6,A,20,6.75,1.21,43.65,11.25,1.21,22.98,8.45,1.11
Russia,Premier League,2016/2017,04/03/2017,11:00,Orenburg,Arsenal Tula,3,0,H,2.01,3.09,4.92,2.15,3.1,4.96,2.02,2.95,4.24
Russia,Premier League,2016/2017,04/03/2017,13:30,CSKA Moscow,Zenit,0,0,D,2.9,3.25,2.69,2.93,3.34,2.75,2.72,3.14,2.6
Russia,Premier League,2016/2017,05/03/2017,08:30,Ural,Amkar,1,0,H,2.78,2.84,3.19,2.82,2.96,3.25,2.64,2.76,3.04
Russia,Premier League,2016/2017,05/03/2017,11:00,FK Krylya Sovetov Samara,Lokomotiv Moscow,0,3,A,4.35,3.21,2.07,4.45,3.25,2.21,4.01,3.06,2.02
Russia,Premier League,2016/2017,05/03/2017,13:30,Krasnodar,Spartak Moscow,2,2,D,2.24,3.47,3.45,2.49,3.68,3.46,2.21,3.26,3.22
Russia,Premier League,2016/2017,05/03/2017,16:00,Akhmat Grozny,Ufa,0,1,A,1.85,3.27,5.64,1.89,3.34,5.8,1.81,3.15,5
Russia,Premier League,2016/2017,06/03/2017,16:30,FK Anzi Makhackala,Rubin Kazan,0,1,A,3.64,3.17,2.3,3.86,3.3,2.45,3.4,3,2.25
Russia,Premier League,2016/2017,10/03/2017,16:00,Arsenal Tula,Ural,2,0,H,2.38,2.96,3.75,2.5,3.15,3.78,2.31,2.87,3.48
Russia,Premier League,2016/2017,11/03/2017,08:30,Ufa,FK Krylya Sovetov Samara,1,0,H,2.21,3.05,4.1,2.33,3.2,4.3,2.2,2.93,3.66
Russia,Premier League,2016/2017,11/03/2017,11:00,CSKA Moscow,Tomsk,4,0,H,,,,1.03,47,176,1.01,22.55,48.41
Russia,Premier League,2016/2017,11/03/2017,13:30,Rubin Kazan,Orenburg,0,0,D,1.99,3.1,5,2.06,3.26,5.2,1.95,3.04,4.37
Russia,Premier League,2016/2017,12/03/2017,08:30,Amkar,Zenit,1,0,H,5.15,3.22,1.93,5.5,3.45,1.96,4.61,3.17,1.86
Russia,Premier League,2016/2017,12/03/2017,13:30,Spartak Moscow,FK Anzi Makhackala,1,0,H,1.34,5.05,11.95,1.4,5.5,13.5,1.34,4.63,9.62
Russia,Premier League,2016/2017,12/03/2017,16:00,FK Rostov,Akhmat Grozny,0,0,D,2.47,2.93,3.57,2.62,3.03,3.66,2.4,2.86,3.3
Russia,Premier League,2016/2017,13/03/2017,16:30,Lokomotiv Moscow,Krasnodar,1,2,A,2,3.2,4.69,2.14,3.28,4.69,1.99,3.06,4.16
Russia,Premier League,2016/2017,17/03/2017,16:00,FK Anzi Makhackala,Orenburg,1,0,H,2.66,2.85,3.35,2.74,2.95,3.6,2.55,2.76,3.15
Russia,Premier League,2016/2017,18/03/2017,08:30,Tomsk,Amkar,1,0,H,,,,18.1,7.5,1.24,14.44,6.18,1.19
Russia,Premier League,2016/2017,18/03/2017,11:00,Ural,Rubin Kazan,1,0,H,3.25,3,2.6,3.38,3.1,2.6,3.16,2.87,2.47
Russia,Premier League,2016/2017,18/03/2017,13:30,Lokomotiv Moscow,Spartak Moscow,1,1,D,2.74,3.16,2.91,2.93,3.35,2.92,2.61,3.07,2.75
Russia,Premier League,2016/2017,19/03/2017,11:00,FK Krylya Sovetov Samara,FK Rostov,0,0,D,3,2.89,2.89,3.42,3,2.89,2.99,2.83,2.62
Russia,Premier League,2016/2017,19/03/2017,13:30,Akhmat Grozny,CSKA Moscow,0,1,A,3.58,3,2.42,3.62,3.08,2.52,3.27,2.89,2.39
Russia,Premier League,2016/2017,19/03/2017,13:30,Krasnodar,Ufa,0,0,D,1.65,3.7,6.7,1.69,3.72,6.75,1.62,3.51,5.97
Russia,Premier League,2016/2017,19/03/2017,16:30,Zenit,Arsenal Tula,2,0,H,,,,1.26,7.4,19.5,1.22,5.63,13.42
Russia,Premier League,2016/2017,31/03/2017,17:30,FK Anzi Makhackala,Ural,2,3,A,2.17,2.96,4.44,2.17,3.02,4.7,2.1,2.89,4.06
Russia,Premier League,2016/2017,01/04/2017,13:00,Ufa,Lokomotiv Moscow,0,1,A,3.69,2.92,2.4,3.75,2.96,2.46,3.46,2.84,2.34
Russia,Premier League,2016/2017,01/04/2017,15:30,Arsenal Tula,Tomsk,3,0,H,,,,1.29,6.6,17,1.24,5.24,14
Russia,Premier League,2016/2017,02/04/2017,11:30,Amkar,Akhmat Grozny,1,1,D,2.57,2.85,3.5,2.66,2.88,3.57,2.49,2.72,3.31
Russia,Premier League,2016/2017,02/04/2017,12:00,Rubin Kazan,Zenit,0,2,A,4.66,3.46,1.92,4.9,3.52,1.97,4.22,3.33,1.89
Russia,Premier League,2016/2017,02/04/2017,14:30,CSKA Moscow,FK Krylya Sovetov Samara,2,1,H,1.36,4.93,11.52,1.39,4.94,12.5,1.34,4.52,9.94
Russia,Premier League,2016/2017,03/04/2017,17:30,FK Rostov,Krasnodar,0,0,D,2.42,3.05,3.51,2.62,3.05,3.53,2.38,2.94,3.23
Russia,Premier League,2016/2017,03/04/2017,17:30,Spartak Moscow,Orenburg,3,2,H,1.36,4.87,11.32,1.41,5.3,12.5,1.35,4.47,9.55
Russia,Premier League,2016/2017,08/04/2017,12:00,FK Krylya Sovetov Samara,Amkar,2,2,D,2.63,2.93,3.29,2.64,3.01,3.62,2.51,2.82,3.16
Russia,Premier League,2016/2017,08/04/2017,14:30,Akhmat Grozny,Arsenal Tula,3,1,H,2.06,3.45,3.92,2.07,3.45,5.95,1.95,3.14,4.3
Russia,Premier League,2016/2017,08/04/2017,17:00,Zenit,FK Anzi Makhackala,1,1,D,1.19,7.5,19.8,1.22,10,26,1.16,6.83,17.14
Russia,Premier League,2016/2017,09/04/2017,12:00,Ufa,Spartak Moscow,1,3,A,5.31,3.53,1.81,5.8,3.55,1.85,4.85,3.3,1.79
Russia,Premier League,2016/2017,09/04/2017,14:30,Krasnodar,CSKA Moscow,1,1,D,2.28,3.26,3.57,2.55,3.26,3.95,2.26,3.07,3.34
Russia,Premier League,2016/2017,09/04/2017,17:00,Lokomotiv Moscow,FK Rostov,0,0,D,2.33,2.98,3.82,2.38,3.1,4.4,2.21,2.92,3.65
Russia,Premier League,2016/2017,10/04/2017,13:00,Tomsk,Rubin Kazan,2,2,D,10.85,4.82,1.37,16.5,5.7,1.37,10.91,4.62,1.32
Russia,Premier League,2016/2017,10/04/2017,15:30,Ural,Orenburg,2,0,H,2.42,2.94,3.69,2.6,2.96,4.1,2.39,2.81,3.39
Russia,Premier League,2016/2017,15/04/2017,10:00,Amkar,Ufa,1,1,D,2.17,2.93,4.48,2.18,2.98,4.9,2.07,2.83,4.28
Russia,Premier League,2016/2017,15/04/2017,12:30,CSKA Moscow,FK Rostov,0,0,D,1.85,3.29,5.55,2.04,3.33,5.55,1.84,3.16,4.79
Russia,Premier League,2016/2017,15/04/2017,15:00,FK Anzi Makhackala,FK Krylya Sovetov Samara,1,3,A,2.15,3.2,4.03,2.26,3.22,4.25,2.13,3,3.77
Russia,Premier League,2016/2017,15/04/2017,17:30,Rubin Kazan,Krasnodar,0,1,A,3.16,3.3,2.47,3.3,3.3,2.54,3.04,3.06,2.41
Russia,Premier League,2016/2017,16/04/2017,10:30,Orenburg,Akhmat Grozny,2,1,H,2.54,2.92,3.46,2.75,2.92,3.5,2.53,2.75,3.2
Russia,Premier League,2016/2017,16/04/2017,13:00,Ural,Tomsk,1,0,H,,,,1.23,8.3,23,1.19,6.09,15.11
Russia,Premier League,2016/2017,16/04/2017,15:30,Arsenal Tula,Lokomotiv Moscow,0,3,A,4.19,3.12,2.15,4.5,3.12,2.15,3.98,3.01,2.06
Russia,Premier League,2016/2017,16/04/2017,18:00,Spartak Moscow,Zenit,2,1,H,2.36,3.54,3.13,2.48,3.54,3.3,2.3,3.33,3
Russia,Premier League,2016/2017,21/04/2017,15:00,Ufa,CSKA Moscow,0,2,A,6.19,3.57,1.71,6.5,3.57,1.76,5.7,3.32,1.7
Russia,Premier League,2016/2017,22/04/2017,12:00,Zenit,Ural,2,0,H,1.26,6.17,14.35,1.28,6.7,16.2,1.24,5.73,11.92
Russia,Premier League,2016/2017,22/04/2017,14:30,FK Rostov,Spartak Moscow,3,0,H,2.73,3.15,2.94,2.9,3.15,2.94,2.67,2.98,2.8
Russia,Premier League,2016/2017,22/04/2017,14:30,Lokomotiv Moscow,Amkar,3,3,D,1.4,4.5,11.09,1.58,4.84,13,1.38,4.16,9.98
Russia,Premier League,2016/2017,22/04/2017,17:00,Akhmat Grozny,FK Anzi Makhackala,0,1,A,2.09,3.09,4.49,2.2,3.2,4.65,2.08,3.02,3.9
Russia,Premier League,2016/2017,23/04/2017,10:00,Tomsk,Orenburg,1,2,A,,,,9.36,4.34,1.53,7.74,3.76,1.47
Russia,Premier League,2016/2017,23/04/2017,12:30,FK Krylya Sovetov Samara,Rubin Kazan,0,0,D,2.76,3.23,2.83,2.86,3.23,2.88,2.66,3.06,2.74
Russia,Premier League,2016/2017,23/04/2017,15:00,Krasnodar,Arsenal Tula,2,0,H,1.4,4.85,9.34,1.4,5.3,12,1.35,4.56,9.53
Russia,Premier League,2016/2017,25/04/2017,17:30,FK Rostov,Ufa,1,0,H,1.51,3.83,10.03,1.56,3.83,10.5,1.5,3.57,8.41
Russia,Premier League,2016/2017,25/04/2017,17:30,Spartak Moscow,Ural,1,0,H,1.23,6.65,15.75,1.29,6.65,18.1,1.2,5.99,14.94
Russia,Premier League,2016/2017,26/04/2017,15:00,Orenburg,Zenit,0,1,A,6.58,3.89,1.63,7.5,3.98,1.68,5.9,3.63,1.61
Russia,Premier League,2016/2017,26/04/2017,17:30,Arsenal Tula,FK Krylya Sovetov Samara,2,0,H,2.46,3.03,3.47,2.53,3.06,3.47,2.39,2.96,3.21
Russia,Premier League,2016/2017,26/04/2017,17:30,CSKA Moscow,Lokomotiv Moscow,4,0,H,1.89,3.48,4.87,1.91,3.48,5.6,1.84,3.25,4.62
Russia,Premier League,2016/2017,26/04/2017,17:30,Rubin Kazan,Akhmat Grozny,0,1,A,2.11,3.19,4.21,2.18,3.3,4.21,2.05,3.09,3.9
Russia,Premier League,2016/2017,27/04/2017,15:00,Amkar,Krasnodar,0,2,A,3.58,3.15,2.33,4.4,3.18,2.33,3.64,3.01,2.18
Russia,Premier League,2016/2017,27/04/2017,17:30,FK Anzi Makhackala,Tomsk,3,3,D,,,,1.19,9,20.95,1.17,6.63,15.69
Russia,Premier League,2016/2017,29/04/2017,14:30,Lokomotiv Moscow,Rubin Kazan,0,1,A,1.99,3.26,4.62,2.07,3.27,4.75,1.97,3.16,4.1
Russia,Premier League,2016/2017,29/04/2017,17:00,Akhmat Grozny,Ural,5,2,H,1.34,5.07,12.26,1.42,5.07,12.26,1.34,4.53,10.1
Russia,Premier League,2016/2017,30/04/2017,12:30,Ufa,Arsenal Tula,1,0,H,2.37,2.96,3.78,2.38,3,4.05,2.27,2.9,3.55
Russia,Premier League,2016/2017,30/04/2017,15:00,CSKA Moscow,Spartak Moscow,1,2,A,2.06,3.42,4.04,2.15,3.58,4.04,2.03,3.31,3.64
Russia,Premier League,2016/2017,30/04/2017,17:30,FK Rostov,Amkar,1,0,H,1.57,3.78,8.13,1.57,3.8,8.9,1.53,3.6,7.38
Russia,Premier League,2016/2017,01/05/2017,11:00,Tomsk,Zenit,0,2,A,,,,28.55,12,1.13,18.38,9.68,1.09
Russia,Premier League,2016/2017,01/05/2017,13:30,FK Krylya Sovetov Samara,Orenburg,1,1,D,2.59,2.9,3.39,2.59,2.98,3.72,2.46,2.87,3.19
Russia,Premier League,2016/2017,01/05/2017,16:00,Krasnodar,FK Anzi Makhackala,0,0,D,1.4,4.83,9.57,1.46,5.4,10,1.41,4.35,8.03
Russia,Premier League,2016/2017,06/05/2017,12:00,Amkar,CSKA Moscow,0,2,A,6.81,3.72,1.64,7.3,3.8,1.73,6.05,3.46,1.63
Russia,Premier League,2016/2017,06/05/2017,14:30,Arsenal Tula,FK Rostov,1,0,H,4.65,3.1,2.05,4.95,3.3,2.06,4.25,3.02,2
Russia,Premier League,2016/2017,06/05/2017,17:00,Spartak Moscow,Tomsk,1,0,H,,,,1.06,23,76.05,1.03,14.52,42.14
Russia,Premier League,2016/2017,07/05/2017,12:00,Orenburg,Krasnodar,1,0,H,4.04,3.03,2.23,4.04,3.2,2.29,3.59,3.02,2.17
Russia,Premier League,2016/2017,07/05/2017,14:30,Rubin Kazan,Ufa,2,1,H,2.05,3.09,4.68,2.12,3.11,4.7,2.01,3,4.25
Russia,Premier League,2016/2017,07/05/2017,17:00,Zenit,Akhmat Grozny,0,1,A,1.39,4.89,9.92,1.42,5.2,10.5,1.39,4.5,8.2
Russia,Premier League,2016/2017,08/05/2017,12:30,Ural,FK Krylya Sovetov Samara,1,3,A,2.67,3.07,3.08,2.7,3.07,3.28,2.55,2.93,2.99
Russia,Premier League,2016/2017,08/05/2017,15:00,FK Anzi Makhackala,Lokomotiv Moscow,0,0,D,2.67,3.13,3.02,2.74,3.15,3.21,2.5,3.03,2.93
Russia,Premier League,2016/2017,12/05/2017,17:30,CSKA Moscow,Arsenal Tula,3,0,H,1.25,6.22,15.39,1.27,6.7,15.5,1.24,5.66,12.35
Russia,Premier League,2016/2017,13/05/2017,10:00,Ural,Krasnodar,1,1,D,4.05,3.31,2.1,4.4,3.36,2.1,3.79,3.22,2.03
Russia,Premier League,2016/2017,13/05/2017,12:30,Amkar,Spartak Moscow,0,1,A,3.29,3.21,2.44,3.5,3.21,2.68,3.21,3.04,2.33
Russia,Premier League,2016/2017,13/05/2017,14:00,FK Krylya Sovetov Samara,Zenit,1,3,A,5.61,3.88,1.7,5.61,3.92,1.78,4.9,3.58,1.71
Russia,Premier League,2016/2017,13/05/2017,17:30,Lokomotiv Moscow,Orenburg,4,0,H,2.26,3.21,3.74,2.3,3.22,4.1,2.18,3.09,3.49
Russia,Premier League,2016/2017,14/05/2017,10:00,Tomsk,Akhmat Grozny,1,2,A,,,,9.8,5.5,1.44,8.17,4.22,1.4
Russia,Premier League,2016/2017,14/05/2017,14:30,Ufa,FK Anzi Makhackala,2,1,H,2.78,2.95,3.07,2.91,2.98,3.07,2.71,2.85,2.86
Russia,Premier League,2016/2017,14/05/2017,17:00,FK Rostov,Rubin Kazan,4,2,H,1.58,3.83,7.52,1.6,4,8,1.56,3.6,6.8
Russia,Premier League,2016/2017,17/05/2017,13:00,Tomsk,FK Krylya Sovetov Samara,0,2,A,,,,9.4,5.2,1.41,8.09,4.49,1.37
Russia,Premier League,2016/2017,17/05/2017,15:30,Orenburg,Ufa,1,1,D,1.57,3.83,7.8,1.63,3.98,8.25,1.54,3.59,7.11
Russia,Premier League,2016/2017,17/05/2017,15:30,Ural,Lokomotiv Moscow,1,2,A,3.1,3.23,2.54,3.1,3.3,2.58,2.89,3.13,2.48
Russia,Premier League,2016/2017,17/05/2017,17:30,Arsenal Tula,Amkar,0,0,D,1.46,4.49,8.55,1.56,4.6,8.6,1.48,3.9,7.33
Russia,Premier League,2016/2017,17/05/2017,17:30,FK Anzi Makhackala,FK Rostov,1,2,A,4.07,3.29,2.1,4.07,3.3,2.19,3.63,3.13,2.11
Russia,Premier League,2016/2017,17/05/2017,17:30,Rubin Kazan,CSKA Moscow,0,2,A,8.85,4.45,1.45,9.8,4.55,1.47,8.25,4.13,1.42
Russia,Premier League,2016/2017,17/05/2017,17:30,Spartak Moscow,Akhmat Grozny,3,0,H,1.93,3.73,4.2,1.93,3.74,4.33,1.87,3.5,4.04
Russia,Premier League,2016/2017,17/05/2017,17:30,Zenit,Krasnodar,1,0,H,1.6,4.43,5.8,1.67,4.43,5.8,1.59,3.93,5.46
Russia,Premier League,2016/2017,21/05/2017,13:00,Amkar,Rubin Kazan,1,2,A,2.57,3.19,3.1,2.62,3.19,3.13,2.5,3.03,2.94
Russia,Premier League,2016/2017,21/05/2017,13:00,Arsenal Tula,Spartak Moscow,3,0,H,3.08,3.76,2.3,3.24,3.88,2.42,2.9,3.45,2.3
Russia,Premier League,2016/2017,21/05/2017,13:00,CSKA Moscow,FK Anzi Makhackala,4,0,H,1.26,6.3,13.99,1.27,6.51,15.72,1.23,5.68,12.22
Russia,Premier League,2016/2017,21/05/2017,13:00,FK Krylya Sovetov Samara,Akhmat Grozny,1,3,A,1.68,4.25,5.2,1.75,4.32,6,1.65,3.73,5.14
Russia,Premier League,2016/2017,21/05/2017,13:00,Lokomotiv Moscow,Zenit,0,2,A,4.82,3.85,1.79,5.5,4.1,1.8,4.57,3.63,1.74
Russia,Premier League,2016/2017,21/05/2017,13:00,Orenburg,FK Rostov,2,0,H,3.81,2.92,2.38,3.94,3.1,2.43,3.42,2.89,2.33
Russia,Premier League,2016/2017,21/05/2017,13:00,Tomsk,Krasnodar,1,5,A,,,,28,11,1.18,17.56,7.19,1.14
Russia,Premier League,2016/2017,21/05/2017,13:00,Ufa,Ural,1,0,H,2.86,3.05,2.88,3,3.05,3.01,2.76,2.92,2.75
Russia,Premier League,2016/2017,25/05/2017,10:00,SKA Khabarovsk,Orenburg,0,0,D,3.75,3.05,2.32,4.2,3.1,2.33,3.57,2.97,2.18
Russia,Premier League,2016/2017,25/05/2017,13:30,Yenisey,Arsenal Tula,2,1,H,2.65,3.01,3.18,2.65,3.18,3.18,2.5,2.94,2.97
Russia,Premier League,2016/2017,28/05/2017,13:00,Orenburg,SKA Khabarovsk,0,0,D,1.52,3.89,8.92,1.52,4.05,11.5,1.47,3.76,8.09
Russia,Premier League,2016/2017,28/05/2017,16:00,Arsenal Tula,Yenisey,1,0,H,1.58,3.99,7.11,1.65,4.04,7.2,1.55,3.82,6.09
Russia,Premier League,2017/2018,15/07/2017,13:00,Ural,FK Rostov,1,1,D,3.05,3.01,2.74,3.08,3.01,3.25,2.86,2.9,2.69
Russia,Premier League,2017/2018,15/07/2017,15:30,Tosno,Ufa,0,1,A,2.42,2.99,3.6,2.6,3,3.6,2.38,2.87,3.32
Russia,Premier League,2017/2018,15/07/2017,18:00,FK Anzi Makhackala,CSKA Moscow,1,3,A,10.32,4.34,1.43,10.32,4.34,1.61,8.25,4.02,1.44
Russia,Premier League,2017/2018,16/07/2017,09:00,SKA Khabarovsk,Zenit,0,2,A,10.12,4.82,1.39,11,5,1.4,8.99,4.43,1.37
Russia,Premier League,2017/2018,16/07/2017,15:30,Rubin Kazan,Krasnodar,1,2,A,2.72,2.94,3.15,2.72,3.1,3.34,2.53,2.91,3.03
Russia,Premier League,2017/2018,16/07/2017,19:30,Akhmat Grozny,Amkar,1,0,H,1.92,3.24,5.1,1.92,3.54,5.9,1.85,3.19,4.66
Russia,Premier League,2017/2018,18/07/2017,17:30,Dynamo Moscow,Spartak Moscow,2,2,D,3.79,3.54,2.09,4.35,3.66,2.11,3.67,3.37,2.02
Russia,Premier League,2017/2018,18/07/2017,17:30,Lokomotiv Moscow,Arsenal Tula,1,0,H,1.45,4.28,9.95,1.49,4.33,10,1.43,4.06,8.4
Russia,Premier League,2017/2018,21/07/2017,17:30,CSKA Moscow,Lokomotiv Moscow,1,3,A,1.54,4.14,7.51,1.57,4.14,7.7,1.52,3.81,6.73
Russia,Premier League,2017/2018,21/07/2017,17:30,FK Anzi Makhackala,Amkar,1,0,H,2.29,3.07,3.8,2.35,3.13,4.2,2.17,2.98,3.72
Russia,Premier League,2017/2018,22/07/2017,15:30,Zenit,Rubin Kazan,2,1,H,1.48,4.49,8.07,1.5,4.75,9.5,1.44,4.16,7.53
Russia,Premier League,2017/2018,22/07/2017,18:00,Krasnodar,Tosno,2,0,H,1.4,4.97,9.32,1.48,5,11.5,1.4,4.37,8.18
Russia,Premier League,2017/2018,23/07/2017,13:00,Ufa,Spartak Moscow,0,0,D,4.59,3.35,1.96,5.47,3.62,2,4.24,3.27,1.91
Russia,Premier League,2017/2018,23/07/2017,15:30,Dynamo Moscow,Ural,0,1,A,1.56,4.17,6.95,1.59,4.17,7.5,1.53,3.84,6.5
Russia,Premier League,2017/2018,23/07/2017,18:00,FK Rostov,Akhmat Grozny,0,1,A,2.58,3.01,3.29,2.58,3.2,3.37,2.42,2.94,3.17
Russia,Premier League,2017/2018,24/07/2017,17:30,Arsenal Tula,SKA Khabarovsk,1,0,H,1.67,3.53,6.99,1.82,3.53,6.99,1.69,3.31,5.86
Russia,Premier League,2017/2018,29/07/2017,13:00,CSKA Moscow,SKA Khabarovsk,2,0,H,1.2,7.05,20.63,1.21,7.57,21,1.18,6.58,16.08
Russia,Premier League,2017/2018,29/07/2017,13:00,Ural,Ufa,1,1,D,2.67,2.83,3.36,2.72,3,3.36,2.54,2.83,3.12
Russia,Premier League,2017/2018,29/07/2017,15:30,Rubin Kazan,Arsenal Tula,2,1,H,1.65,3.64,7.05,1.72,3.7,7.3,1.66,3.43,5.91
Russia,Premier League,2017/2018,29/07/2017,18:00,Akhmat Grozny,Dynamo Moscow,2,0,H,,,,2.16,3.18,4.3,2.08,3.04,3.87
Russia,Premier League,2017/2018,30/07/2017,13:00,Amkar,FK Rostov,0,1,A,2.89,2.76,3.16,3.14,2.8,3.34,2.79,2.63,3.02
Russia,Premier League,2017/2018,30/07/2017,15:30,Lokomotiv Moscow,FK Anzi Makhackala,1,0,H,1.56,3.97,7.54,1.6,4,8,1.54,3.7,6.86
Russia,Premier League,2017/2018,30/07/2017,18:00,Tosno,Zenit,0,1,A,22.38,7.03,1.19,22.38,7.03,1.28,16.27,6.15,1.19
Russia,Premier League,2017/2018,31/07/2017,17:30,Spartak Moscow,Krasnodar,2,0,H,1.71,4.06,5.17,1.81,4.06,5.6,1.68,3.81,4.81
Russia,Premier League,2017/2018,04/08/2017,18:00,FK Anzi Makhackala,FK Rostov,0,1,A,3.43,2.89,2.58,3.43,2.89,2.72,3.18,2.75,2.56
Russia,Premier League,2017/2018,05/08/2017,13:00,Ufa,Akhmat Grozny,3,2,H,,,,3.25,2.95,2.91,2.98,2.74,2.71
Russia,Premier League,2017/2018,05/08/2017,15:30,Dynamo Moscow,Amkar,3,0,H,1.74,3.48,6.16,1.77,3.54,6.16,1.73,3.34,5.31
Russia,Premier League,2017/2018,05/08/2017,18:00,Lokomotiv Moscow,SKA Khabarovsk,1,0,H,1.26,5.66,17.89,1.29,5.7,19.05,1.24,5.16,14.42
Russia,Premier League,2017/2018,06/08/2017,13:00,Arsenal Tula,Tosno,1,2,A,2.3,3.1,3.75,2.32,3.1,3.96,2.2,2.98,3.58
Russia,Premier League,2017/2018,06/08/2017,15:30,CSKA Moscow,Rubin Kazan,1,2,A,1.5,4.28,8.1,1.59,4.28,8.36,1.49,3.94,7.09
Russia,Premier League,2017/2018,06/08/2017,18:00,Krasnodar,Ural,1,1,D,1.37,5,10.65,1.45,5,13,1.36,4.51,9.42
Russia,Premier League,2017/2018,06/08/2017,18:00,Zenit,Spartak Moscow,5,1,H,1.98,3.62,4.11,2.11,3.62,4.11,1.98,3.41,3.71
Russia,Premier League,2017/2018,08/08/2017,09:00,SKA Khabarovsk,FK Anzi Makhackala,2,0,H,2.74,2.92,3.15,2.85,2.97,3.38,2.68,2.8,2.95
Russia,Premier League,2017/2018,08/08/2017,15:30,Amkar,Ufa,0,0,D,2.63,2.85,3.4,2.77,2.88,3.4,2.55,2.75,3.21
Russia,Premier League,2017/2018,09/08/2017,15:30,Ural,Zenit,1,1,D,7.33,4.05,1.56,8.3,4.38,1.58,6.64,3.82,1.53
Russia,Premier League,2017/2018,09/08/2017,17:30,Spartak Moscow,Arsenal Tula,2,0,H,1.33,5.4,11.44,1.34,6,14,1.31,4.96,9.98
Russia,Premier League,2017/2018,09/08/2017,18:00,FK Rostov,Dynamo Moscow,1,0,H,1.98,3.26,4.72,2.07,3.26,5,1.94,3.08,4.34
Russia,Premier League,2017/2018,09/08/2017,18:00,Rubin Kazan,Lokomotiv Moscow,1,1,D,2.63,3.08,3.13,2.68,3.08,3.32,2.54,2.91,3.01
Russia,Premier League,2017/2018,09/08/2017,18:00,Tosno,CSKA Moscow,1,2,A,7.02,4.15,1.56,8,4.3,1.59,6.38,3.91,1.53
Russia,Premier League,2017/2018,10/08/2017,18:00,Akhmat Grozny,Krasnodar,2,3,A,,,,2.91,3.15,2.99,2.69,3,2.75
Russia,Premier League,2017/2018,12/08/2017,13:00,Ufa,FK Rostov,1,4,A,3.08,2.83,2.88,3.11,2.95,3.02,2.91,2.72,2.8
Russia,Premier League,2017/2018,12/08/2017,15:30,CSKA Moscow,Spartak Moscow,2,1,H,2.03,3.66,3.87,2.35,3.68,3.91,2.03,3.45,3.54
Russia,Premier League,2017/2018,12/08/2017,18:00,FK Anzi Makhackala,Dynamo Moscow,1,3,A,2.91,2.98,2.9,3.1,3.05,2.91,2.82,2.89,2.73
Russia,Premier League,2017/2018,13/08/2017,09:00,SKA Khabarovsk,Rubin Kazan,1,1,D,4.6,3.29,1.99,4.85,3.38,2.1,4.1,3.12,2
Russia,Premier League,2017/2018,13/08/2017,15:30,Lokomotiv Moscow,Tosno,0,2,A,1.4,4.68,10.51,1.44,4.68,11.5,1.37,4.37,9.48
Russia,Premier League,2017/2018,13/08/2017,18:00,Krasnodar,Amkar,1,1,D,1.47,4.33,8.9,1.49,4.5,9.3,1.45,4.07,7.74
Russia,Premier League,2017/2018,13/08/2017,18:00,Zenit,Akhmat Grozny,4,0,H,1.48,4.63,7.48,1.48,4.7,8.9,1.44,4.21,7.47
Russia,Premier League,2017/2018,14/08/2017,17:30,Arsenal Tula,Ural,2,2,D,2.39,3.17,3.43,2.68,3.17,3.52,2.35,2.94,3.33
Russia,Premier League,2017/2018,18/08/2017,17:30,Tosno,SKA Khabarovsk,0,0,D,1.58,3.77,7.84,1.77,3.82,8,1.58,3.51,6.69
Russia,Premier League,2017/2018,19/08/2017,13:00,Ural,CSKA Moscow,0,0,D,5.36,3.81,1.74,5.75,3.81,1.79,5.15,3.55,1.69
Russia,Premier League,2017/2018,19/08/2017,15:30,Spartak Moscow,Lokomotiv Moscow,3,4,A,1.85,3.53,5,1.95,3.54,5.4,1.82,3.36,4.61
Russia,Premier League,2017/2018,19/08/2017,18:00,Rubin Kazan,FK Anzi Makhackala,6,0,H,1.63,3.7,7.05,1.67,3.78,7.4,1.61,3.53,6.27
Russia,Premier League,2017/2018,20/08/2017,13:00,Amkar,Zenit,0,1,A,5.95,3.54,1.74,6.9,3.66,1.78,5.41,3.39,1.71
Russia,Premier League,2017/2018,20/08/2017,15:30,Dynamo Moscow,Ufa,1,1,D,1.88,3.41,5.02,1.93,3.43,5.63,1.81,3.25,4.84
Russia,Premier League,2017/2018,20/08/2017,18:00,FK Rostov,Krasnodar,0,0,D,2.28,3.21,3.64,2.46,3.24,3.64,2.25,3.03,3.42
Russia,Premier League,2017/2018,21/08/2017,18:00,Akhmat Grozny,Arsenal Tula,1,2,A,1.56,3.98,7.62,1.6,4.4,8.2,1.55,3.73,6.54
Russia,Premier League,2017/2018,25/08/2017,18:00,FK Anzi Makhackala,Ufa,1,0,H,2.72,2.97,3.12,2.96,3.1,3.12,2.67,2.82,2.95
Russia,Premier League,2017/2018,26/08/2017,13:00,Arsenal Tula,Amkar,0,1,A,2.41,2.96,3.67,2.5,2.96,3.74,2.4,2.85,3.35
Russia,Premier League,2017/2018,26/08/2017,15:30,Rubin Kazan,Tosno,1,0,H,1.72,3.61,6.03,1.72,3.88,7.3,1.62,3.55,6.01
Russia,Premier League,2017/2018,26/08/2017,18:00,Lokomotiv Moscow,Ural,2,1,H,1.51,4.22,8.06,1.55,4.3,8.2,1.48,4.01,7.2
Russia,Premier League,2017/2018,27/08/2017,09:00,SKA Khabarovsk,Spartak Moscow,0,0,D,7.51,4.4,1.51,8.2,4.5,1.52,7.14,3.99,1.48
Russia,Premier League,2017/2018,27/08/2017,15:30,CSKA Moscow,Akhmat Grozny,0,1,A,1.42,5.05,8.25,1.47,5.1,9,1.38,4.56,8.21
Russia,Premier League,2017/2018,27/08/2017,18:00,Krasnodar,Dynamo Moscow,2,0,H,1.69,3.91,5.61,1.8,3.91,5.61,1.7,3.63,4.97
Russia,Premier League,2017/2018,27/08/2017,18:00,Zenit,FK Rostov,0,0,D,1.68,3.62,6.56,1.7,4.25,7.4,1.65,3.55,5.63
Russia,Premier League,2017/2018,08/09/2017,15:30,Amkar,CSKA Moscow,0,1,A,6.13,3.7,1.69,6.51,3.94,1.73,5.73,3.52,1.65
Russia,Premier League,2017/2018,09/09/2017,12:00,Tosno,FK Anzi Makhackala,2,2,D,1.98,3.39,4.42,2.1,3.44,4.65,1.98,3.2,4.03
Russia,Premier League,2017/2018,09/09/2017,14:30,FK Rostov,Arsenal Tula,2,2,D,1.51,3.94,9.2,1.56,4.03,9.73,1.5,3.71,7.95
Russia,Premier League,2017/2018,09/09/2017,17:00,Spartak Moscow,Rubin Kazan,1,0,H,1.7,3.99,5.4,1.74,4.1,5.52,1.68,3.72,5.05
Russia,Premier League,2017/2018,10/09/2017,12:00,Dynamo Moscow,Zenit,0,0,D,5.48,3.88,1.71,5.9,4.1,1.75,5.08,3.64,1.69
Russia,Premier League,2017/2018,10/09/2017,14:30,Ufa,Krasnodar,0,1,A,4.05,3.23,2.13,4.22,3.32,2.2,3.73,3.14,2.09
Russia,Premier League,2017/2018,10/09/2017,17:00,Akhmat Grozny,Lokomotiv Moscow,1,1,D,2.7,3.15,2.96,2.71,3.15,3.1,2.58,3.02,2.85
Russia,Premier League,2017/2018,11/09/2017,15:30,Ural,SKA Khabarovsk,1,1,D,1.58,3.85,7.58,1.66,3.91,7.7,1.58,3.61,6.47
Russia,Premier League,2017/2018,15/09/2017,17:30,Arsenal Tula,Dynamo Moscow,1,0,H,2.8,2.98,3.02,3.14,3.04,3.02,2.68,2.94,2.83
Russia,Premier League,2017/2018,16/09/2017,14:30,CSKA Moscow,FK Rostov,2,0,H,1.7,3.57,6.33,1.73,3.7,6.5,1.66,3.46,5.75
Russia,Premier League,2017/2018,16/09/2017,17:00,FK Anzi Makhackala,Krasnodar,1,5,A,5.35,3.89,1.72,5.75,4,1.8,4.91,3.65,1.71
Russia,Premier League,2017/2018,17/09/2017,09:00,SKA Khabarovsk,Akhmat Grozny,2,2,D,5.1,3.32,1.89,5.1,3.32,1.96,4.63,3.15,1.88
Russia,Premier League,2017/2018,17/09/2017,11:00,Tosno,Spartak Moscow,2,2,D,4.56,3.57,1.9,5.1,3.72,1.93,4.3,3.46,1.84
Russia,Premier League,2017/2018,17/09/2017,14:30,Rubin Kazan,Ural,0,1,A,1.59,4,6.8,1.7,4,7.1,1.58,3.7,6.14
Russia,Premier League,2017/2018,18/09/2017,17:30,Lokomotiv Moscow,Amkar,0,1,A,1.53,3.84,8.98,1.57,7.75,9.8,1.49,3.82,7.87
Russia,Premier League,2017/2018,18/09/2017,18:00,Zenit,Ufa,3,0,H,1.32,5.37,11.95,1.33,10,15.72,1.27,5.43,11.29
Russia,Premier League,2017/2018,23/09/2017,14:30,Dynamo Moscow,CSKA Moscow,0,0,D,5.66,3.64,1.74,5.9,6.5,1.77,5.05,3.59,1.71
Russia,Premier League,2017/2018,23/09/2017,17:00,Spartak Moscow,FK Anzi Makhackala,2,2,D,1.31,5.94,10.68,1.35,8.5,11.5,1.3,5.49,8.96
Russia,Premier League,2017/2018,24/09/2017,12:00,Ural,Tosno,3,1,H,2.4,3.1,3.49,2.43,3.26,3.5,2.33,3.05,3.23
Russia,Premier League,2017/2018,24/09/2017,14:30,FK Rostov,Lokomotiv Moscow,0,1,A,2.34,3.01,3.76,2.43,3.02,3.81,2.29,2.87,3.55
Russia,Premier League,2017/2018,24/09/2017,14:30,Ufa,Arsenal Tula,1,0,H,2.38,3.01,3.66,2.38,3.05,3.94,2.28,2.93,3.5
Russia,Premier League,2017/2018,24/09/2017,17:00,Krasnodar,Zenit,0,2,A,2.67,3.33,2.85,2.9,3.38,2.9,2.6,3.19,2.72
Russia,Premier League,2017/2018,25/09/2017,15:00,Amkar,SKA Khabarovsk,3,0,H,1.65,3.46,7.7,1.73,6.5,7.7,1.6,3.48,6.72
Russia,Premier League,2017/2018,25/09/2017,17:30,Akhmat Grozny,Rubin Kazan,1,0,H,2.59,3.16,3.1,2.66,6.5,3.25,2.43,3.18,3.01
Russia,Premier League,2017/2018,29/09/2017,17:30,Arsenal Tula,Krasnodar,1,0,H,5.27,3.99,1.71,5.8,4,2,4.95,3.65,1.7
Russia,Premier League,2017/2018,30/09/2017,09:30,SKA Khabarovsk,FK Rostov,2,1,H,6.21,3.39,1.76,6.5,3.45,1.87,5.72,3.23,1.73
Russia,Premier League,2017/2018,30/09/2017,12:00,Tosno,Akhmat Grozny,1,0,H,2.92,3.13,2.75,3.38,3.23,2.75,2.92,3,2.55
Russia,Premier League,2017/2018,30/09/2017,14:30,Rubin Kazan,Amkar,0,1,A,1.81,3.26,6.04,1.84,3.74,6.45,1.73,3.24,5.63
Russia,Premier League,2017/2018,30/09/2017,17:00,Spartak Moscow,Ural,2,0,H,1.47,4.82,7.27,1.53,4.94,7.43,1.46,4.46,6.24
Russia,Premier League,2017/2018,01/10/2017,12:00,CSKA Moscow,Ufa,0,0,D,1.33,5.3,11.78,1.34,8,13.35,1.3,5.1,10.47
Russia,Premier League,2017/2018,01/10/2017,14:30,Lokomotiv Moscow,Dynamo Moscow,3,0,H,1.78,3.53,5.58,1.82,7.25,5.61,1.75,3.47,4.97
Russia,Premier League,2017/2018,01/10/2017,17:00,FK Anzi Makhackala,Zenit,2,2,D,8.91,4.37,1.46,9.9,4.8,1.49,7.74,4.27,1.43
Russia,Premier League,2017/2018,13/10/2017,17:30,Akhmat Grozny,Spartak Moscow,1,2,A,3.04,3.45,2.46,3.34,3.45,2.48,3.01,3.24,2.34
Russia,Premier League,2017/2018,14/10/2017,12:00,Dynamo Moscow,SKA Khabarovsk,2,0,H,1.41,4.5,10.56,1.46,4.65,10.97,1.39,4.26,8.92
Russia,Premier League,2017/2018,14/10/2017,14:30,Ural,FK Anzi Makhackala,2,1,H,2.01,3.45,4.19,2.09,3.45,4.46,1.98,3.27,3.89
Russia,Premier League,2017/2018,14/10/2017,17:00,Krasnodar,CSKA Moscow,0,1,A,2.16,3.4,3.72,2.3,3.49,3.8,2.14,3.25,3.38
Russia,Premier League,2017/2018,15/10/2017,12:00,Ufa,Lokomotiv Moscow,1,0,H,3.89,3.03,2.28,3.95,3.04,2.33,3.64,2.89,2.24
Russia,Premier League,2017/2018,15/10/2017,14:30,FK Rostov,Rubin Kazan,0,1,A,2.48,2.92,3.56,2.59,2.94,3.75,2.37,2.8,3.46
Russia,Premier League,2017/2018,15/10/2017,17:00,Zenit,Arsenal Tula,0,1,A,1.27,5.94,14.58,1.29,6.2,17,1.25,5.42,12.83
Russia,Premier League,2017/2018,16/10/2017,15:30,Amkar,Tosno,0,0,D,2.32,2.96,3.89,2.4,3.02,4.04,2.28,2.84,3.6
Russia,Premier League,2017/2018,21/10/2017,09:30,SKA Khabarovsk,Ufa,2,2,D,3.55,2.84,2.55,3.65,2.88,2.69,3.41,2.74,2.45
Russia,Premier League,2017/2018,21/10/2017,12:00,Tosno,FK Rostov,1,1,D,3.43,2.94,2.54,3.43,3.01,2.69,3.21,2.86,2.47
Russia,Premier League,2017/2018,21/10/2017,14:30,Rubin Kazan,Dynamo Moscow,0,0,D,1.91,3.35,4.9,1.95,3.42,5.1,1.87,3.23,4.5
Russia,Premier League,2017/2018,21/10/2017,17:00,Spartak Moscow,Amkar,0,0,D,1.45,4.55,8.58,1.47,4.64,9,1.42,4.23,7.86
Russia,Premier League,2017/2018,22/10/2017,12:00,Ural,Akhmat Grozny,2,0,H,3.11,3.21,2.55,3.19,3.23,2.63,2.97,3.06,2.47
Russia,Premier League,2017/2018,22/10/2017,14:30,CSKA Moscow,Zenit,0,0,D,2.81,3.25,2.76,3.15,3.28,2.84,2.73,3.08,2.67
Russia,Premier League,2017/2018,22/10/2017,17:00,FK Anzi Makhackala,Arsenal Tula,3,2,H,2.61,3.13,3.11,2.69,3.17,3.16,2.5,3,2.98
Russia,Premier League,2017/2018,23/10/2017,17:30,Lokomotiv Moscow,Krasnodar,2,0,H,2.5,3.31,3.1,2.66,3.31,3.1,2.48,3.1,2.91
Russia,Premier League,2017/2018,27/10/2017,17:30,Arsenal Tula,CSKA Moscow,1,0,H,5.63,3.42,1.81,5.63,3.55,1.86,5.01,3.34,1.77
Russia,Premier League,2017/2018,28/10/2017,17:00,FK Rostov,Spartak Moscow,2,2,D,3.04,3.09,2.69,3.22,3.13,2.72,2.88,2.98,2.6
Russia,Premier League,2017/2018,29/10/2017,08:30,Amkar,Ural,1,1,D,2.26,2.89,4.16,2.36,3,4.21,2.19,2.85,3.85
Russia,Premier League,2017/2018,29/10/2017,11:00,Dynamo Moscow,Tosno,0,1,A,2.31,3.12,3.67,2.36,3.26,3.9,2.23,3.08,3.42
Russia,Premier League,2017/2018,29/10/2017,13:30,Zenit,Lokomotiv Moscow,0,3,A,1.69,3.61,6.33,1.76,3.68,6.5,1.69,3.41,5.56
Russia,Premier League,2017/2018,29/10/2017,16:00,Krasnodar,SKA Khabarovsk,4,1,H,1.21,7.31,15,1.22,7.8,23,1.17,6.58,16.25
Russia,Premier League,2017/2018,30/10/2017,14:00,Ufa,Rubin Kazan,2,1,H,3.68,2.95,2.41,3.84,3.08,2.55,3.51,2.8,2.36
Russia,Premier League,2017/2018,30/10/2017,16:30,Akhmat Grozny,FK Anzi Makhackala,1,1,D,1.6,3.91,7.06,1.66,4.14,7.5,1.58,3.78,6.01
Russia,Premier League,2017/2018,03/11/2017,14:30,Ural,Dynamo Moscow,2,2,D,2.31,3.07,3.75,2.36,3.28,3.9,2.24,3.01,3.49
Russia,Premier League,2017/2018,04/11/2017,13:30,Tosno,Krasnodar,1,3,A,4.06,3.43,2.05,4.2,3.46,2.15,3.8,3.23,2.02
Russia,Premier League,2017/2018,04/11/2017,16:00,Akhmat Grozny,FK Rostov,1,0,H,2.55,2.95,3.41,2.55,3.02,3.44,2.43,2.88,3.24
Russia,Premier League,2017/2018,05/11/2017,08:00,SKA Khabarovsk,Arsenal Tula,1,2,A,3.22,2.98,2.65,3.27,3.15,2.83,3.04,2.88,2.56
Russia,Premier League,2017/2018,05/11/2017,11:00,Amkar,FK Anzi Makhackala,1,2,A,1.88,3.22,5.47,1.96,3.26,5.8,1.83,3.09,5.08
Russia,Premier League,2017/2018,05/11/2017,13:30,Lokomotiv Moscow,CSKA Moscow,2,2,D,3.44,3.24,2.35,3.48,3.28,2.58,3.22,3.01,2.36
Russia,Premier League,2017/2018,05/11/2017,16:00,Rubin Kazan,Zenit,0,0,D,3.61,3.1,2.35,3.96,3.23,2.37,3.5,3,2.23
Russia,Premier League,2017/2018,05/11/2017,16:00,Spartak Moscow,Ufa,3,1,H,1.45,4.69,8.05,1.51,4.69,8.79,1.42,4.34,7.7
Russia,Premier League,2017/2018,18/11/2017,09:00,SKA Khabarovsk,CSKA Moscow,2,4,A,7.37,3.99,1.56,8.5,4,1.58,7.18,3.77,1.52
Russia,Premier League,2017/2018,18/11/2017,11:00,Dynamo Moscow,Akhmat Grozny,1,1,D,2.75,2.99,3.05,2.76,3.12,3.1,2.64,2.95,2.87
Russia,Premier League,2017/2018,18/11/2017,13:30,Krasnodar,Spartak Moscow,1,4,A,2.41,3.64,2.99,2.48,3.65,3.21,2.3,3.39,2.99
Russia,Premier League,2017/2018,18/11/2017,16:00,Arsenal Tula,Rubin Kazan,0,0,D,3.24,3.02,2.6,3.24,3.1,2.7,3.07,2.88,2.53
Russia,Premier League,2017/2018,19/11/2017,08:30,Ufa,Ural,2,0,H,2.23,3.09,3.97,2.39,3.15,4.2,2.19,2.94,3.74
Russia,Premier League,2017/2018,19/11/2017,11:00,FK Anzi Makhackala,Lokomotiv Moscow,0,1,A,4.55,3.52,1.92,4.75,3.6,1.96,4.29,3.34,1.88
Russia,Premier League,2017/2018,19/11/2017,13:30,FK Rostov,Amkar,0,0,D,1.83,3.18,6.15,1.85,3.21,6.5,1.78,3.06,5.69
Russia,Premier League,2017/2018,19/11/2017,16:00,Zenit,Tosno,5,0,H,1.37,4.89,10.86,1.37,5.6,13.5,1.34,4.75,9.39
Russia,Premier League,2017/2018,24/11/2017,14:30,Amkar,Dynamo Moscow,2,1,H,2.41,2.81,3.93,2.5,2.9,3.93,2.34,2.73,3.67
Russia,Premier League,2017/2018,25/11/2017,13:30,Tosno,Arsenal Tula,3,2,H,2.33,3.13,3.63,2.44,3.23,3.85,2.25,3.01,3.48
Russia,Premier League,2017/2018,25/11/2017,16:00,Akhmat Grozny,Ufa,2,1,H,1.98,3.24,4.72,2.06,3.3,5,1.92,3.1,4.52
Russia,Premier League,2017/2018,26/11/2017,08:30,Ural,Krasnodar,0,1,A,4.31,3.48,1.98,4.6,3.5,2.05,4,3.34,1.95
Russia,Premier League,2017/2018,26/11/2017,11:00,Rubin Kazan,CSKA Moscow,0,1,A,3.31,3.09,2.5,3.6,3.13,2.6,3.21,2.89,2.45
Russia,Premier League,2017/2018,26/11/2017,13:30,FK Rostov,FK Anzi Makhackala,2,0,H,1.65,3.67,6.9,1.71,3.69,6.9,1.64,3.48,6.06
Russia,Premier League,2017/2018,27/11/2017,09:00,SKA Khabarovsk,Lokomotiv Moscow,1,2,A,5.99,3.77,1.68,6.3,3.81,1.75,5.44,3.57,1.66
Russia,Premier League,2017/2018,27/11/2017,16:30,Spartak Moscow,Zenit,3,1,H,2.74,3.33,2.78,2.75,3.5,2.9,2.62,3.22,2.68
Russia,Premier League,2017/2018,01/12/2017,16:30,Arsenal Tula,Spartak Moscow,0,1,A,3.68,3.29,2.23,4.02,3.5,2.41,3.5,3.2,2.15
Russia,Premier League,2017/2018,01/12/2017,16:30,CSKA Moscow,Tosno,6,0,H,1.4,4.76,9.69,1.47,5,10.02,1.4,4.43,8.18
Russia,Premier League,2017/2018,02/12/2017,11:00,Dynamo Moscow,FK Rostov,2,0,H,3.23,2.84,2.75,3.26,2.9,2.85,3.05,2.75,2.69
Russia,Premier League,2017/2018,02/12/2017,11:00,Zenit,Ural,2,1,H,1.25,6.11,16.61,1.27,6.3,16.61,1.24,5.6,12.67
Russia,Premier League,2017/2018,02/12/2017,13:30,Lokomotiv Moscow,Rubin Kazan,1,0,H,2.06,3,4.84,2.18,3.11,4.84,2.04,2.95,4.29
Russia,Premier League,2017/2018,03/12/2017,11:00,Ufa,Amkar,3,0,H,2.47,2.75,3.89,2.5,2.81,4.2,2.38,2.67,3.71
Russia,Premier League,2017/2018,03/12/2017,13:30,Krasnodar,Akhmat Grozny,3,2,H,1.73,3.75,5.55,1.82,3.75,6.4,1.73,3.53,5.03
Russia,Premier League,2017/2018,03/12/2017,16:00,FK Anzi Makhackala,SKA Khabarovsk,4,0,H,1.66,3.79,6.27,1.75,4.05,7.2,1.6,3.67,6.09
Russia,Premier League,2017/2018,08/12/2017,14:30,Ural,Arsenal Tula,1,1,D,2.6,3,3.25,2.64,3.12,3.48,2.49,2.92,3.12
Russia,Premier League,2017/2018,09/12/2017,11:00,Dynamo Moscow,FK Anzi Makhackala,2,0,H,1.85,3.48,5.03,1.95,3.48,5.2,1.83,3.3,4.69
Russia,Premier League,2017/2018,09/12/2017,13:30,Rubin Kazan,SKA Khabarovsk,3,1,H,1.3,5.4,14.51,1.34,5.4,15.25,1.28,4.93,12.36
Russia,Premier League,2017/2018,10/12/2017,11:00,Amkar,Krasnodar,1,3,A,3.43,2.91,2.56,3.7,3.03,2.56,3.27,2.92,2.41
Russia,Premier League,2017/2018,10/12/2017,13:30,Spartak Moscow,CSKA Moscow,3,0,H,2.69,3.24,2.9,2.8,3.4,2.9,2.64,3.16,2.72
Russia,Premier League,2017/2018,10/12/2017,16:00,FK Rostov,Ufa,1,0,H,2.06,2.99,4.86,2.13,3.11,5.1,2,2.94,4.48
Russia,Premier League,2017/2018,11/12/2017,16:30,Akhmat Grozny,Zenit,0,0,D,4.37,3.35,1.99,4.9,3.58,2.06,4.17,3.27,1.93
Russia,Premier League,2017/2018,11/12/2017,16:30,Tosno,Lokomotiv Moscow,1,3,A,4.63,3.27,1.98,5.3,3.44,2.08,4.27,3.19,1.94
Russia,Premier League,2017/2018,02/03/2018,16:30,FK Anzi Makhackala,Rubin Kazan,1,1,D,3.64,2.94,2.41,3.81,3.02,2.43,3.53,2.85,2.31
Russia,Premier League,2017/2018,03/03/2018,11:00,CSKA Moscow,Ural,1,0,H,1.28,5.54,14.97,1.35,5.6,15.47,1.28,5.09,12.21
Russia,Premier League,2017/2018,03/03/2018,13:30,Zenit,Amkar,0,0,D,1.32,4.99,13.91,1.35,5.5,14.3,1.31,4.68,11.69
Russia,Premier League,2017/2018,03/03/2018,16:00,Krasnodar,FK Rostov,3,1,H,2.06,3.24,4.24,2.07,3.35,5.15,1.99,3.16,4.1
Russia,Premier League,2017/2018,04/03/2018,08:00,SKA Khabarovsk,Tosno,0,1,A,3.94,3.32,2.1,4.33,3.34,2.3,3.77,3.15,2.08
Russia,Premier League,2017/2018,04/03/2018,11:00,Ufa,Dynamo Moscow,1,1,D,2.49,2.86,3.58,2.53,3,3.7,2.41,2.82,3.35
Russia,Premier League,2017/2018,04/03/2018,13:30,Lokomotiv Moscow,Spartak Moscow,0,0,D,2.83,3.23,2.72,2.97,3.36,2.94,2.71,3.12,2.66
Russia,Premier League,2017/2018,04/03/2018,16:00,Arsenal Tula,Akhmat Grozny,1,0,H,2.59,3.05,3.16,2.65,3.1,3.3,2.49,2.96,3.06
Russia,Premier League,2017/2018,09/03/2018,11:00,Amkar,Arsenal Tula,0,2,A,3.28,2.59,2.87,3.32,2.79,3.1,3.03,2.62,2.81
Russia,Premier League,2017/2018,10/03/2018,11:00,Ufa,FK Anzi Makhackala,3,2,H,2,3.01,5.05,2.06,3.15,5.4,1.95,3,4.62
Russia,Premier League,2017/2018,10/03/2018,13:30,Dynamo Moscow,Krasnodar,0,0,D,3.26,3.32,2.37,3.52,3.42,2.45,3.19,3.15,2.31
Russia,Premier League,2017/2018,10/03/2018,16:00,Tosno,Rubin Kazan,0,1,A,4.89,2.92,2.07,5,3.08,2.15,4.35,2.91,2.03
Russia,Premier League,2017/2018,11/03/2018,11:00,FK Rostov,Zenit,0,0,D,3.33,2.86,2.63,3.78,3,2.63,3.27,2.82,2.46
Russia,Premier League,2017/2018,11/03/2018,13:30,Akhmat Grozny,CSKA Moscow,0,3,A,4.05,3.12,2.16,4.2,3.2,2.2,3.79,3.05,2.12
Russia,Premier League,2017/2018,11/03/2018,16:00,Spartak Moscow,SKA Khabarovsk,1,0,H,1.12,10.3,25.8,1.14,11,29,1.11,8.75,21.58
Russia,Premier League,2017/2018,12/03/2018,14:00,Ural,Lokomotiv Moscow,0,2,A,4.23,3.04,2.15,4.35,3.2,2.26,3.91,2.97,2.12
Russia,Premier League,2017/2018,17/03/2018,08:00,SKA Khabarovsk,Ural,0,3,A,3.67,3.02,2.35,3.8,3.15,2.4,3.53,2.99,2.23
Russia,Premier League,2017/2018,17/03/2018,11:00,Arsenal Tula,FK Rostov,2,2,D,2.84,2.84,3.08,2.88,2.89,3.2,2.73,2.74,2.97
Russia,Premier League,2017/2018,17/03/2018,13:30,Krasnodar,Ufa,0,1,A,1.5,4.15,8.2,1.67,4.2,8.55,1.49,3.93,7.35
Russia,Premier League,2017/2018,17/03/2018,16:00,FK Anzi Makhackala,Tosno,2,0,H,2.25,3.13,3.75,2.35,3.18,3.84,2.23,3.02,3.48
Russia,Premier League,2017/2018,17/03/2018,16:00,Rubin Kazan,Spartak Moscow,1,2,A,3.29,3.05,2.51,3.4,3.1,2.54,3.16,2.98,2.41
Russia,Premier League,2017/2018,31/03/2018,12:00,Akhmat Grozny,SKA Khabarovsk,0,0,D,1.25,5.93,16.56,1.3,6.1,19,1.24,5.45,14.33
Russia,Premier League,2017/2018,31/03/2018,12:00,Amkar,Lokomotiv Moscow,2,1,H,8.59,3.61,1.57,11,3.85,1.61,8,3.53,1.54
Russia,Premier League,2017/2018,31/03/2018,14:30,Dynamo Moscow,Arsenal Tula,2,1,H,2.25,3.1,3.8,2.42,3.2,3.8,2.25,3,3.51
Russia,Premier League,2017/2018,31/03/2018,17:00,Spartak Moscow,Tosno,2,1,H,1.34,5,12.25,1.37,5.05,13.35,1.32,4.78,10.26
Russia,Premier League,2017/2018,01/04/2018,12:00,Ural,Rubin Kazan,1,1,D,3.22,2.81,2.75,3.46,2.9,2.75,3.16,2.78,2.57
Russia,Premier League,2017/2018,01/04/2018,14:30,Ufa,Zenit,1,2,A,4.56,3.19,2.01,4.9,3.25,2.06,4.27,3.08,1.98
Russia,Premier League,2017/2018,01/04/2018,17:00,FK Rostov,CSKA Moscow,1,2,A,3.46,2.96,2.48,3.6,3,2.5,3.34,2.91,2.37
Russia,Premier League,2017/2018,01/04/2018,17:00,Krasnodar,FK Anzi Makhackala,1,1,D,1.42,4.77,8.42,1.46,4.85,9.5,1.41,4.44,7.68
Russia,Premier League,2017/2018,07/04/2018,09:00,SKA Khabarovsk,Amkar,0,2,A,4.36,3.09,2.1,4.5,3.2,2.17,4.03,3.04,2.06
Russia,Premier League,2017/2018,07/04/2018,12:00,Rubin Kazan,Akhmat Grozny,3,2,H,2.06,3.04,4.66,2.12,3.2,4.7,2.04,3.01,4.19
Russia,Premier League,2017/2018,07/04/2018,14:30,Zenit,Krasnodar,1,2,A,1.85,3.65,4.6,1.89,3.7,4.75,1.83,3.46,4.43
Russia,Premier League,2017/2018,07/04/2018,17:00,Arsenal Tula,Ufa,2,1,H,2.42,2.79,3.72,2.5,3.1,3.78,2.36,2.85,3.47
Russia,Premier League,2017/2018,08/04/2018,12:00,Tosno,Ural,2,2,D,2.22,3.07,3.94,2.45,3.14,3.96,2.21,3.03,3.58
Russia,Premier League,2017/2018,08/04/2018,14:30,Lokomotiv Moscow,FK Rostov,1,0,H,1.92,3.15,5.22,2.09,3.18,5.22,1.94,3.04,4.61
Russia,Premier League,2017/2018,08/04/2018,17:00,FK Anzi Makhackala,Spartak Moscow,1,4,A,4.91,3.97,1.74,5.3,4,1.78,4.81,3.7,1.71
Russia,Premier League,2017/2018,09/04/2018,17:30,CSKA Moscow,Dynamo Moscow,1,2,A,1.63,3.73,6.69,1.69,3.85,6.7,1.62,3.62,5.85
Russia,Premier League,2017/2018,13/04/2018,17:30,Akhmat Grozny,Tosno,1,0,H,1.69,3.59,6.23,1.75,3.85,6.3,1.68,3.49,5.53
Russia,Premier League,2017/2018,14/04/2018,09:30,Amkar,Rubin Kazan,0,3,A,3.15,2.63,3.02,3.18,2.8,3.02,2.96,2.71,2.82
Russia,Premier League,2017/2018,14/04/2018,12:00,Dynamo Moscow,Lokomotiv Moscow,0,4,A,3.77,3.22,2.2,3.9,3.23,2.3,3.59,3.06,2.18
Russia,Premier League,2017/2018,14/04/2018,14:30,Zenit,FK Anzi Makhackala,1,0,H,1.39,4.82,9.65,1.39,5.25,10.97,1.35,4.77,9.03
Russia,Premier League,2017/2018,14/04/2018,17:00,Krasnodar,Arsenal Tula,3,0,H,1.65,4,5.72,1.68,4.1,6.13,1.63,3.8,5.45
Russia,Premier League,2017/2018,15/04/2018,12:00,Ural,Spartak Moscow,2,1,H,5.79,4.18,1.62,6.13,4.25,1.66,5.6,3.88,1.6
Russia,Premier League,2017/2018,15/04/2018,14:30,Ufa,CSKA Moscow,1,1,D,5.47,3.42,1.8,5.5,3.46,1.87,5.12,3.25,1.79
Russia,Premier League,2017/2018,15/04/2018,17:00,FK Rostov,SKA Khabarovsk,2,0,H,1.25,5.95,15.5,1.27,6.3,19.05,1.22,5.7,15.5
Russia,Premier League,2017/2018,18/04/2018,17:30,Lokomotiv Moscow,Akhmat Grozny,0,0,D,1.76,3.43,5.83,1.81,3.7,6.5,1.7,3.38,5.65
Russia,Premier League,2017/2018,18/04/2018,17:30,Zenit,Dynamo Moscow,2,1,H,1.53,4.09,7.57,1.56,4.2,8.3,1.5,3.96,6.93
Russia,Premier League,2017/2018,18/04/2018,18:30,CSKA Moscow,Amkar,3,0,H,1.47,4.27,8.65,1.48,4.5,10.02,1.43,4.16,8.37
Russia,Premier League,2017/2018,21/04/2018,14:30,Rubin Kazan,FK Rostov,1,1,D,2.24,2.97,4.04,2.34,3.1,4.46,2.15,2.86,4.01
Russia,Premier League,2017/2018,21/04/2018,17:00,FK Anzi Makhackala,Ural,0,1,A,2.12,3.27,3.95,2.25,3.36,4.1,2.1,3.18,3.68
Russia,Premier League,2017/2018,22/04/2018,09:00,SKA Khabarovsk,Dynamo Moscow,0,1,A,7.58,3.76,1.58,7.7,3.88,1.61,6.81,3.7,1.55
Russia,Premier League,2017/2018,22/04/2018,12:00,Arsenal Tula,Zenit,3,3,D,4.68,3.52,1.88,5.09,3.6,1.91,4.53,3.41,1.83
Russia,Premier League,2017/2018,22/04/2018,14:30,CSKA Moscow,Krasnodar,2,1,H,1.85,3.61,4.69,1.94,3.62,4.75,1.83,3.47,4.43
Russia,Premier League,2017/2018,22/04/2018,14:30,Tosno,Amkar,0,2,A,2.69,2.93,3.15,2.75,3.01,3.3,2.6,2.9,3.01
Russia,Premier League,2017/2018,22/04/2018,17:00,Lokomotiv Moscow,Ufa,0,0,D,1.53,3.9,8.26,1.63,3.98,8.5,1.53,3.68,7.36
Russia,Premier League,2017/2018,23/04/2018,17:30,Spartak Moscow,Akhmat Grozny,1,3,A,1.43,4.65,8.65,1.46,4.85,9,1.41,4.47,7.88
Russia,Premier League,2017/2018,28/04/2018,17:30,Arsenal Tula,FK Anzi Makhackala,2,1,H,1.86,3.54,4.74,2.03,3.6,4.85,1.88,3.37,4.27
Russia,Premier League,2017/2018,29/04/2018,12:00,Amkar,Spartak Moscow,0,2,A,5.33,3.53,1.79,5.71,3.75,1.82,5.12,3.53,1.72
Russia,Premier League,2017/2018,29/04/2018,14:30,Zenit,CSKA Moscow,0,0,D,2.29,3.31,3.43,2.33,3.4,3.6,2.24,3.19,3.32
Russia,Premier League,2017/2018,29/04/2018,17:00,FK Rostov,Tosno,2,0,H,1.61,3.64,7.5,1.67,3.7,7.5,1.61,3.54,6.32
Russia,Premier League,2017/2018,30/04/2018,09:30,Ufa,SKA Khabarovsk,1,0,H,1.3,5.04,13.26,1.34,5.35,14.3,1.29,4.96,11.84
Russia,Premier League,2017/2018,30/04/2018,12:00,Dynamo Moscow,Rubin Kazan,0,0,D,3.18,2.71,2.91,3.2,2.83,3.05,2.96,2.73,2.76
Russia,Premier League,2017/2018,30/04/2018,14:30,Akhmat Grozny,Ural,0,0,D,1.8,3.29,5.87,1.8,3.6,5.94,1.72,3.41,5.27
Russia,Premier League,2017/2018,30/04/2018,17:00,Krasnodar,Lokomotiv Moscow,2,0,H,2.56,3.26,3.01,2.6,3.42,3.2,2.46,3.18,2.92
Russia,Premier League,2017/2018,05/05/2018,09:00,SKA Khabarovsk,Krasnodar,0,1,A,10.13,5.33,1.32,15,5.54,1.34,10.38,5.06,1.3
Russia,Premier League,2017/2018,05/05/2018,12:00,Tosno,Dynamo Moscow,1,2,A,3,3.03,2.63,3.1,3.15,2.8,2.93,2.97,2.58
Russia,Premier League,2017/2018,05/05/2018,14:30,Lokomotiv Moscow,Zenit,1,0,H,2.39,3.11,3.29,2.51,3.2,3.4,2.35,3.06,3.2
Russia,Premier League,2017/2018,05/05/2018,17:00,Spartak Moscow,FK Rostov,2,0,H,1.66,3.6,6.18,1.72,4.2,7.1,1.62,3.7,5.71
Russia,Premier League,2017/2018,06/05/2018,12:00,Ural,Amkar,0,2,A,2.63,2.89,3.15,2.85,3,3.25,2.66,2.87,2.93
Russia,Premier League,2017/2018,06/05/2018,17:00,CSKA Moscow,Arsenal Tula,6,0,H,1.32,5.36,10.23,1.39,5.95,10.97,1.32,5.04,9.08
Russia,Premier League,2017/2018,07/05/2018,17:30,FK Anzi Makhackala,Akhmat Grozny,0,2,A,3.3,3.2,2.38,3.4,3.35,2.48,3.21,3.1,2.33
Russia,Premier League,2017/2018,07/05/2018,17:30,Rubin Kazan,Ufa,0,0,D,1.76,3.24,6.19,1.87,3.4,6.5,1.75,3.17,5.64
Russia,Premier League,2017/2018,13/05/2018,12:00,Amkar,Akhmat Grozny,0,0,D,2.11,3.4,3.72,2.2,3.5,4.05,2.06,3.26,3.68
Russia,Premier League,2017/2018,13/05/2018,12:00,Arsenal Tula,Lokomotiv Moscow,2,0,H,2.1,3.72,3.45,2.18,3.72,3.7,2.06,3.49,3.4
Russia,Premier League,2017/2018,13/05/2018,12:00,CSKA Moscow,FK Anzi Makhackala,2,1,H,1.2,6.71,17.83,1.23,7.2,18.57,1.19,6.56,14.55
Russia,Premier League,2017/2018,13/05/2018,12:00,FK Rostov,Ural,1,0,H,1.66,3.62,6.23,1.77,3.62,6.23,1.68,3.43,5.69
Russia,Premier League,2017/2018,13/05/2018,12:00,Krasnodar,Rubin Kazan,1,1,D,1.65,3.7,6.28,1.66,3.95,6.4,1.62,3.71,5.67
Russia,Premier League,2017/2018,13/05/2018,12:00,Spartak Moscow,Dynamo Moscow,0,1,A,1.43,4.84,7.63,1.47,5.25,8,1.43,4.57,6.92
Russia,Premier League,2017/2018,13/05/2018,12:00,Ufa,Tosno,5,0,H,1.78,3.42,5.51,1.86,3.5,5.85,1.78,3.31,5.02
Russia,Premier League,2017/2018,13/05/2018,12:00,Zenit,SKA Khabarovsk,6,0,H,1.15,8.2,23.15,1.17,9,27.6,1.13,7.82,19.35
Russia,Premier League,2017/2018,17/05/2018,13:00,Yenisey,FK Anzi Makhackala,3,0,H,2.14,3.28,3.88,2.23,3.34,3.88,2.12,3.18,3.58
Russia,Premier League,2017/2018,17/05/2018,15:30,Amkar,Tambov,2,0,H,1.81,3.22,5.97,1.86,3.4,6.51,1.77,3.19,5.36
Russia,Premier League,2017/2018,20/05/2018,16:00,Tambov,Amkar,0,1,A,3.19,3.19,2.47,3.22,3.3,2.7,2.99,3.08,2.45
Russia,Premier League,2017/2018,20/05/2018,19:00,FK Anzi Makhackala,Yenisey,4,3,H,2.09,3.54,3.73,2.19,3.66,4,2.06,3.43,3.45
Russia,Premier League,2018/2019,28/07/2018,14:30,Ural,FK Anzi Makhackala,0,1,A,1.61,3.73,6.99,1.62,4,7.1,1.57,3.7,6.42
Russia,Premier League,2018/2019,28/07/2018,17:00,Spartak Moscow,Orenburg,1,0,H,1.46,4.38,8.29,1.5,4.6,9,1.44,4.2,7.67
Russia,Premier League,2018/2019,28/07/2018,19:30,FK Rostov,Akhmat Grozny,1,0,H,2.25,3.02,3.9,2.38,3.1,3.9,2.24,2.93,3.62
Russia,Premier League,2018/2019,29/07/2018,12:00,Yenisey,Zenit,0,2,A,7.5,3.63,1.6,9,4,1.65,6.65,3.58,1.58
Russia,Premier League,2018/2019,29/07/2018,14:30,Arsenal Tula,Dynamo Moscow,0,0,D,3.09,2.88,2.76,3.1,3.16,2.86,2.89,2.92,2.68
Russia,Premier League,2018/2019,29/07/2018,17:00,Rubin Kazan,Krasnodar,2,1,H,2.87,2.9,2.95,3,3.05,3,2.78,2.9,2.8
Russia,Premier League,2018/2019,30/07/2018,16:00,Ufa,Lokomotiv Moscow,0,0,D,4.42,3.06,2.08,4.8,3.1,2.15,4.24,2.96,2.05
Russia,Premier League,2018/2019,31/07/2018,17:00,FK Krylya Sovetov Samara,CSKA Moscow,0,0,D,4.26,3.14,2.09,4.5,3.24,2.13,4.02,3.03,2.06
Russia,Premier League,2018/2019,03/08/2018,17:30,Dynamo Moscow,Rubin Kazan,1,1,D,2.75,2.9,3.08,2.95,2.92,3.1,2.75,2.75,2.95
Russia,Premier League,2018/2019,04/08/2018,12:00,Ural,Krasnodar,1,2,A,3.41,3.25,2.32,3.6,3.26,2.36,3.3,3.09,2.28
Russia,Premier League,2018/2019,04/08/2018,14:30,Zenit,Arsenal Tula,1,0,H,1.3,5.28,13.82,1.35,5.44,14.77,1.32,4.77,10.79
Russia,Premier League,2018/2019,04/08/2018,17:00,Lokomotiv Moscow,Spartak Moscow,0,0,D,2.77,3.13,2.84,2.86,3.2,2.94,2.67,3.01,2.79
Russia,Premier League,2018/2019,05/08/2018,14:30,FK Krylya Sovetov Samara,Orenburg,0,3,A,2.42,2.93,3.6,2.48,3,3.76,2.36,2.83,3.47
Russia,Premier League,2018/2019,05/08/2018,17:00,CSKA Moscow,FK Rostov,0,1,A,1.88,3.27,5.11,1.97,3.27,5.25,1.87,3.15,4.72
Russia,Premier League,2018/2019,05/08/2018,19:30,Akhmat Grozny,Yenisey,1,0,H,1.74,3.58,5.65,1.87,3.64,5.65,1.74,3.37,5.19
Russia,Premier League,2018/2019,06/08/2018,15:30,Ufa,FK Anzi Makhackala,3,0,H,1.57,3.76,7.68,1.65,3.86,7.69,1.57,3.58,6.86
Russia,Premier League,2018/2019,10/08/2018,15:30,Ural,Dynamo Moscow,1,1,D,2.6,2.96,3.22,2.66,3,3.4,2.53,2.86,3.13
Russia,Premier League,2018/2019,11/08/2018,14:30,Yenisey,CSKA Moscow,1,1,D,5.27,3.43,1.81,5.27,3.5,1.91,4.75,3.23,1.84
Russia,Premier League,2018/2019,11/08/2018,17:00,Spartak Moscow,FK Anzi Makhackala,1,0,H,1.2,7.83,14.45,1.23,7.83,17.62,1.2,6.38,13.25
Russia,Premier League,2018/2019,11/08/2018,19:30,FK Rostov,FK Krylya Sovetov Samara,0,1,A,1.79,3.14,6.44,1.84,3.4,6.5,1.74,3.16,5.85
Russia,Premier League,2018/2019,12/08/2018,12:00,Orenburg,Lokomotiv Moscow,1,0,H,3.86,3,2.27,3.98,3.05,2.35,3.65,2.89,2.25
Russia,Premier League,2018/2019,12/08/2018,14:30,Arsenal Tula,Akhmat Grozny,3,1,H,2.75,2.91,3.06,2.86,3.1,3.1,2.65,2.87,2.95
Russia,Premier League,2018/2019,13/08/2018,15:30,Ufa,Krasnodar,0,1,A,3.47,3.02,2.42,3.75,3.1,2.49,3.35,2.95,2.36
Russia,Premier League,2018/2019,13/08/2018,18:00,Rubin Kazan,Zenit,0,1,A,3.82,3.14,2.21,4.26,3.14,2.21,3.86,2.99,2.13
Russia,Premier League,2018/2019,17/08/2018,17:30,FK Anzi Makhackala,Orenburg,1,3,A,4.21,3.03,2.16,4.5,3.14,2.18,4.07,3.01,2.06
Russia,Premier League,2018/2019,18/08/2018,14:30,CSKA Moscow,Arsenal Tula,3,0,H,1.66,3.7,6.22,1.72,3.7,7.4,1.65,3.54,5.71
Russia,Premier League,2018/2019,18/08/2018,17:00,Krasnodar,Spartak Moscow,0,1,A,2.78,3.37,2.66,3.18,3.4,2.7,2.71,3.23,2.58
Russia,Premier League,2018/2019,18/08/2018,19:30,Akhmat Grozny,Rubin Kazan,1,1,D,2.88,2.79,3.05,2.91,2.9,3.07,2.77,2.78,2.89
Russia,Premier League,2018/2019,19/08/2018,14:30,FK Krylya Sovetov Samara,Lokomotiv Moscow,0,1,A,4.41,3.19,2.03,4.9,3.19,2.08,4.28,3.04,2
Russia,Premier League,2018/2019,19/08/2018,17:00,Zenit,Ural,4,1,H,1.36,4.93,10.61,1.4,5.04,12,1.34,4.67,9.82
Russia,Premier League,2018/2019,19/08/2018,19:30,FK Rostov,Yenisey,4,0,H,1.62,3.71,6.86,1.65,3.71,7.4,1.6,3.47,6.5
Russia,Premier League,2018/2019,20/08/2018,17:30,Dynamo Moscow,Ufa,3,0,H,1.75,3.2,6.62,1.81,3.4,7.6,1.73,3.17,5.85
Russia,Premier League,2018/2019,24/08/2018,17:30,Arsenal Tula,FK Rostov,0,1,A,3.31,2.96,2.55,3.44,2.97,2.61,3.17,2.86,2.51
Russia,Premier League,2018/2019,25/08/2018,12:00,Ural,Akhmat Grozny,2,1,H,2.53,3.03,3.29,2.56,3.08,3.4,2.45,2.94,3.16
Russia,Premier League,2018/2019,25/08/2018,14:30,Rubin Kazan,CSKA Moscow,1,1,D,2.77,2.92,3.04,2.8,2.97,3.1,2.64,2.85,2.99
Russia,Premier League,2018/2019,25/08/2018,17:00,Spartak Moscow,Dynamo Moscow,2,1,H,1.78,3.44,5.43,1.85,3.79,5.64,1.75,3.44,4.99
Russia,Premier League,2018/2019,26/08/2018,12:00,Orenburg,Krasnodar,1,1,D,3.72,3.16,2.24,3.9,3.17,2.33,3.5,3.04,2.22
Russia,Premier League,2018/2019,26/08/2018,14:30,Ufa,Zenit,0,2,A,6.37,3.27,1.75,6.85,3.5,1.77,5.77,3.33,1.7
Russia,Premier League,2018/2019,26/08/2018,17:00,Lokomotiv Moscow,FK Anzi Makhackala,2,1,H,1.25,5.52,19.58,1.27,6,21.9,1.23,5.34,16.58
Russia,Premier League,2018/2019,27/08/2018,15:30,Yenisey,FK Krylya Sovetov Samara,1,0,H,2.71,2.94,3.09,2.88,3.1,3.12,2.64,2.87,2.98
Russia,Premier League,2018/2019,31/08/2018,17:30,FK Rostov,Rubin Kazan,1,1,D,2.36,2.85,3.88,2.51,2.9,3.92,2.36,2.76,3.62
Russia,Premier League,2018/2019,01/09/2018,12:00,FK Krylya Sovetov Samara,FK Anzi Makhackala,1,0,H,1.72,3.54,5.93,1.74,3.64,6.35,1.68,3.47,5.62
Russia,Premier League,2018/2019,01/09/2018,14:30,CSKA Moscow,Ural,4,0,H,1.54,4.15,6.94,1.59,4.25,7.46,1.54,3.9,6.45
Russia,Premier League,2018/2019,01/09/2018,17:00,Krasnodar,Lokomotiv Moscow,2,1,H,2.47,3.17,3.21,2.54,3.26,3.42,2.39,2.99,3.21
Russia,Premier League,2018/2019,02/09/2018,12:00,Yenisey,Arsenal Tula,0,0,D,2.35,3.04,3.58,2.53,3.06,3.6,2.39,2.92,3.31
Russia,Premier League,2018/2019,02/09/2018,14:30,Dynamo Moscow,Orenburg,2,0,H,2.21,3.09,3.92,2.26,3.2,4.35,2.11,3.04,3.85
Russia,Premier League,2018/2019,02/09/2018,17:00,Zenit,Spartak Moscow,0,0,D,2,3.55,3.97,2.06,3.72,4.15,1.99,3.47,3.7
Russia,Premier League,2018/2019,02/09/2018,19:30,Akhmat Grozny,Ufa,2,1,H,1.76,3.4,5.87,1.91,3.4,5.87,1.8,3.17,5.24
Russia,Premier League,2018/2019,14/09/2018,17:30,Lokomotiv Moscow,Dynamo Moscow,1,1,D,2.04,3.09,4.48,2.1,3.2,4.78,2.02,3.03,4.24
Russia,Premier League,2018/2019,15/09/2018,12:00,Rubin Kazan,Yenisey,1,0,H,1.7,3.34,6.75,1.74,3.5,7.2,1.67,3.31,6.17
Russia,Premier League,2018/2019,15/09/2018,14:30,Ufa,CSKA Moscow,0,3,A,3.95,3.04,2.2,4.6,3.2,2.28,3.9,3.02,2.11
Russia,Premier League,2018/2019,15/09/2018,17:00,Arsenal Tula,FK Krylya Sovetov Samara,4,0,H,2.43,2.86,3.65,2.43,3.08,3.82,2.34,2.91,3.45
Russia,Premier League,2018/2019,16/09/2018,12:00,Orenburg,Zenit,1,2,A,6.1,3.5,1.7,6.7,3.7,1.71,5.83,3.45,1.67
Russia,Premier League,2018/2019,16/09/2018,14:30,FK Anzi Makhackala,Krasnodar,0,4,A,7.74,4.11,1.5,9,4.45,1.51,7.49,4.03,1.47
Russia,Premier League,2018/2019,16/09/2018,17:00,Spartak Moscow,Akhmat Grozny,1,2,A,1.56,4,6.88,1.59,4.25,7.9,1.55,3.84,6.47
Russia,Premier League,2018/2019,17/09/2018,15:30,Ural,FK Rostov,1,1,D,3.5,2.79,2.55,3.9,2.88,2.61,3.38,2.77,2.47
Russia,Premier League,2018/2019,22/09/2018,09:30,Yenisey,Ural,1,2,A,2.3,3.04,3.67,2.4,3.1,3.82,2.25,3,3.54
Russia,Premier League,2018/2019,22/09/2018,12:00,Dynamo Moscow,FK Anzi Makhackala,0,1,A,1.31,5.34,11.54,1.36,5.45,13,1.31,4.9,11.08
Russia,Premier League,2018/2019,22/09/2018,14:30,Arsenal Tula,Rubin Kazan,2,2,D,2.98,2.91,2.8,3.04,3,2.86,2.91,2.86,2.72
Russia,Premier League,2018/2019,22/09/2018,17:00,Akhmat Grozny,Orenburg,1,1,D,2.07,3.18,4.19,2.18,3.2,4.45,2.06,3.05,4.03
Russia,Premier League,2018/2019,22/09/2018,17:00,FK Rostov,Ufa,0,0,D,1.78,3.2,6.23,1.81,3.4,6.65,1.75,3.17,5.78
Russia,Premier League,2018/2019,23/09/2018,14:30,Zenit,Lokomotiv Moscow,5,3,H,1.66,3.7,6.09,1.74,3.86,6.15,1.66,3.58,5.64
Russia,Premier League,2018/2019,23/09/2018,17:00,CSKA Moscow,Spartak Moscow,1,1,D,2.4,3.4,3.07,2.48,3.4,3.42,2.34,3.24,3.06
Russia,Premier League,2018/2019,24/09/2018,16:30,FK Krylya Sovetov Samara,Krasnodar,0,3,A,4.53,3.4,1.92,5,3.5,2,4.32,3.31,1.9
Russia,Premier League,2018/2019,28/09/2018,15:30,Orenburg,CSKA Moscow,0,1,A,4.05,3.17,2.13,4.5,3.21,2.2,3.91,3.07,2.08
Russia,Premier League,2018/2019,29/09/2018,09:30,Ural,Arsenal Tula,2,1,H,2.26,3.27,3.52,2.33,3.33,3.75,2.21,3.16,3.41
Russia,Premier League,2018/2019,29/09/2018,14:30,Ufa,Yenisey,2,1,H,2.11,3.06,4.34,2.21,3.07,4.35,2.12,2.94,4.02
Russia,Premier League,2018/2019,29/09/2018,17:00,Lokomotiv Moscow,Akhmat Grozny,2,0,H,1.97,3.15,4.82,2.01,3.32,4.92,1.95,3.1,4.41
Russia,Premier League,2018/2019,30/09/2018,12:00,FK Anzi Makhackala,Zenit,2,1,H,12.92,5.33,1.29,15.25,5.46,1.36,11.45,5.09,1.29
Russia,Premier League,2018/2019,30/09/2018,14:30,Krasnodar,Dynamo Moscow,3,0,H,1.68,3.88,5.43,1.78,3.92,5.5,1.68,3.69,5.08
Russia,Premier League,2018/2019,30/09/2018,17:00,Spartak Moscow,FK Rostov,0,1,A,1.86,3.51,4.73,1.93,3.51,5.4,1.86,3.28,4.55
Russia,Premier League,2018/2019,01/10/2018,17:30,Rubin Kazan,FK Krylya Sovetov Samara,2,1,H,1.72,3.35,6.38,1.84,3.45,6.7,1.71,3.3,5.85
Russia,Premier League,2018/2019,05/10/2018,17:30,Arsenal Tula,Ufa,1,1,D,2.31,3.09,3.64,2.41,3.13,3.72,2.26,2.98,3.5
Russia,Premier League,2018/2019,06/10/2018,12:00,FK Krylya Sovetov Samara,Dynamo Moscow,1,0,H,3.38,3.11,2.42,3.4,3.18,2.48,3.23,2.97,2.4
Russia,Premier League,2018/2019,06/10/2018,14:30,FK Rostov,Orenburg,0,1,A,1.88,3.2,5.25,1.92,3.25,5.6,1.85,3.12,4.97
Russia,Premier League,2018/2019,06/10/2018,17:00,Rubin Kazan,Ural,1,0,H,1.89,3.22,5.14,1.95,3.4,5.23,1.86,3.16,4.84
Russia,Premier League,2018/2019,07/10/2018,09:30,Yenisey,Spartak Moscow,2,3,A,4.36,3.3,2,4.5,3.38,2.03,4.1,3.24,1.96
Russia,Premier League,2018/2019,07/10/2018,12:00,Akhmat Grozny,FK Anzi Makhackala,0,0,D,1.51,3.95,8,1.52,4.34,9.2,1.47,3.95,7.76
Russia,Premier League,2018/2019,07/10/2018,14:30,Zenit,Krasnodar,2,1,H,1.98,3.5,4.13,2.12,3.6,4.36,1.98,3.34,3.86
Russia,Premier League,2018/2019,07/10/2018,17:00,CSKA Moscow,Lokomotiv Moscow,0,1,A,2.13,3.19,4.03,2.17,3.28,4.14,2.08,3.16,3.78
Russia,Premier League,2018/2019,19/10/2018,16:00,FK Anzi Makhackala,CSKA Moscow,0,2,A,9.08,4.64,1.4,11,4.65,1.51,8.36,4.19,1.42
Russia,Premier League,2018/2019,19/10/2018,18:30,Lokomotiv Moscow,FK Rostov,2,1,H,2.13,3.03,4.28,2.2,3.04,4.34,2.12,2.91,4.05
Russia,Premier League,2018/2019,20/10/2018,09:30,Orenburg,Yenisey,0,0,D,2.04,3.03,4.72,2.07,3.17,4.78,2,3.01,4.33
Russia,Premier League,2018/2019,20/10/2018,12:00,Ural,FK Krylya Sovetov Samara,1,1,D,2.24,3.03,3.91,2.27,3.1,3.91,2.19,2.98,3.68
Russia,Premier League,2018/2019,20/10/2018,14:30,Ufa,Rubin Kazan,0,0,D,2.95,2.8,3,2.95,2.88,3.05,2.83,2.73,2.9
Russia,Premier League,2018/2019,21/10/2018,12:00,Dynamo Moscow,Zenit,1,0,H,3.73,3.21,2.21,4.14,3.3,2.23,3.66,3.14,2.13
Russia,Premier League,2018/2019,21/10/2018,14:30,Spartak Moscow,Arsenal Tula,2,3,A,1.53,4.32,6.51,1.6,4.4,7.5,1.52,4.02,6.32
Russia,Premier League,2018/2019,21/10/2018,16:59,Krasnodar,Akhmat Grozny,0,1,A,1.53,4.42,6.26,1.65,4.42,7,1.53,4.06,6.1
Russia,Premier League,2018/2019,27/10/2018,12:00,Ural,Ufa,1,1,D,2.41,2.99,3.55,2.41,3.02,3.75,2.31,2.93,3.45
Russia,Premier League,2018/2019,27/10/2018,14:30,Arsenal Tula,Orenburg,2,2,D,2.15,3.15,4.01,2.21,3.2,4.25,2.1,3.06,3.84
Russia,Premier League,2018/2019,27/10/2018,17:00,FK Rostov,FK Anzi Makhackala,1,0,H,1.4,4.19,11.53,1.42,4.64,11.53,1.38,4.21,10
Russia,Premier League,2018/2019,28/10/2018,11:00,Yenisey,Lokomotiv Moscow,0,3,A,4.11,3.11,2.14,4.42,3.15,2.15,3.97,3.02,2.09
Russia,Premier League,2018/2019,28/10/2018,13:30,Akhmat Grozny,Dynamo Moscow,0,0,D,2.47,2.98,3.45,2.51,3.1,3.46,2.41,2.91,3.28
Russia,Premier League,2018/2019,28/10/2018,16:00,CSKA Moscow,Krasnodar,1,2,A,2.26,3.38,3.4,2.35,3.4,3.98,2.2,3.28,3.3
Russia,Premier League,2018/2019,29/10/2018,15:00,FK Krylya Sovetov Samara,Zenit,0,1,A,6.83,3.7,1.61,7,3.8,1.66,6.26,3.63,1.6
Russia,Premier League,2018/2019,29/10/2018,17:30,Rubin Kazan,Spartak Moscow,1,1,D,2.91,2.94,2.88,2.94,3.06,3.13,2.75,2.89,2.85
Russia,Premier League,2018/2019,03/11/2018,11:00,Lokomotiv Moscow,Arsenal Tula,3,1,H,1.73,3.36,6.25,1.76,3.6,6.56,1.7,3.37,5.66
Russia,Premier League,2018/2019,03/11/2018,13:30,Dynamo Moscow,CSKA Moscow,0,0,D,3.34,3.05,2.48,3.4,3.08,2.57,3.17,2.97,2.44
Russia,Premier League,2018/2019,04/11/2018,11:00,Zenit,Akhmat Grozny,1,0,H,1.51,4.31,6.92,1.57,4.31,7.4,1.5,4.06,6.67
Russia,Premier League,2018/2019,04/11/2018,13:30,Krasnodar,FK Rostov,2,2,D,1.83,3.4,5.17,1.9,3.55,5.2,1.82,3.35,4.68
Russia,Premier League,2018/2019,04/11/2018,16:00,Spartak Moscow,Ural,1,2,A,1.59,4.13,6.01,1.64,4.13,6.65,1.57,3.92,5.89
Russia,Premier League,2018/2019,05/11/2018,11:00,Orenburg,Rubin Kazan,1,0,H,3.05,2.86,2.83,3.22,2.88,2.85,3.07,2.77,2.65
Russia,Premier League,2018/2019,05/11/2018,13:30,Ufa,FK Krylya Sovetov Samara,1,2,A,2.27,2.94,4,2.35,3.04,4.04,2.2,2.92,3.77
Russia,Premier League,2018/2019,05/11/2018,16:00,FK Anzi Makhackala,Yenisey,2,1,H,3.31,3.16,2.43,3.31,3.17,2.57,3.15,3.03,2.41
Russia,Premier League,2018/2019,09/11/2018,16:30,Arsenal Tula,FK Anzi Makhackala,2,0,H,1.48,4.29,7.57,1.57,4.29,7.8,1.48,4.01,7.17
Russia,Premier League,2018/2019,10/11/2018,11:00,Ural,Orenburg,2,1,H,2.38,3.03,3.54,2.43,3.1,3.56,2.34,2.95,3.37
Russia,Premier League,2018/2019,10/11/2018,13:30,FK Krylya Sovetov Samara,Akhmat Grozny,1,2,A,2.49,3.06,3.3,2.65,3.06,3.33,2.46,2.93,3.18
Russia,Premier League,2018/2019,10/11/2018,16:00,FK Rostov,Dynamo Moscow,0,0,D,2.07,2.96,4.72,2.11,3.15,4.85,2.01,2.98,4.38
Russia,Premier League,2018/2019,11/11/2018,11:00,Ufa,Spartak Moscow,2,0,H,3.14,3.04,2.61,3.25,3.17,2.7,3,3.01,2.52
Russia,Premier League,2018/2019,11/11/2018,13:00,Krasnodar,Yenisey,3,0,H,1.37,5.01,9.07,1.4,5.1,10,1.36,4.73,8.62
Russia,Premier League,2018/2019,11/11/2018,13:30,Rubin Kazan,Lokomotiv Moscow,0,0,D,3.05,2.78,2.92,3.15,3,2.92,2.9,2.81,2.77
Russia,Premier League,2018/2019,11/11/2018,16:00,CSKA Moscow,Zenit,2,0,H,2.59,3.06,3.14,2.7,3.22,3.16,2.47,3.08,2.99
Russia,Premier League,2018/2019,23/11/2018,15:00,Akhmat Grozny,CSKA Moscow,0,2,A,3.69,3.09,2.29,4,3.1,2.3,3.55,2.98,2.24
Russia,Premier League,2018/2019,23/11/2018,17:30,Lokomotiv Moscow,Ural,1,2,A,1.6,3.71,6.99,1.61,3.9,7.5,1.57,3.61,6.62
Russia,Premier League,2018/2019,24/11/2018,11:00,Dynamo Moscow,Yenisey,1,2,A,1.78,3.49,5.37,1.82,3.5,6.3,1.75,3.34,5.24
Russia,Premier League,2018/2019,24/11/2018,13:30,Orenburg,Ufa,1,0,H,2.54,2.74,3.68,2.65,2.85,3.68,2.44,2.74,3.46
Russia,Premier League,2018/2019,24/11/2018,16:00,FK Anzi Makhackala,Rubin Kazan,1,1,D,5.41,3.27,1.84,5.61,3.4,1.88,5.13,3.18,1.8
Russia,Premier League,2018/2019,25/11/2018,11:00,Spartak Moscow,FK Krylya Sovetov Samara,3,1,H,1.55,4.17,6.49,1.6,4.2,7.5,1.54,3.88,6.29
Russia,Premier League,2018/2019,25/11/2018,13:30,Krasnodar,Arsenal Tula,3,0,H,1.43,4.85,7.36,1.47,4.85,8.5,1.43,4.48,6.98
Russia,Premier League,2018/2019,25/11/2018,16:00,Zenit,FK Rostov,2,0,H,1.75,3.52,5.55,1.8,3.55,5.9,1.73,3.38,5.27
Russia,Premier League,2018/2019,30/11/2018,16:30,Rubin Kazan,Dynamo Moscow,1,1,D,2.46,2.74,3.85,2.46,2.87,3.94,2.34,2.73,3.69
Russia,Premier League,2018/2019,01/12/2018,11:00,Yenisey,Akhmat Grozny,1,1,D,2.71,2.97,3.07,2.81,3.01,3.07,2.69,2.85,2.91
Russia,Premier League,2018/2019,01/12/2018,16:00,FK Anzi Makhackala,Ufa,0,0,D,4.3,2.9,2.2,4.3,2.94,2.3,3.92,2.84,2.19
Russia,Premier League,2018/2019,02/12/2018,11:00,Krasnodar,Ural,2,0,H,1.46,4.7,7.12,1.48,4.75,8.25,1.44,4.46,6.87
Russia,Premier League,2018/2019,02/12/2018,13:30,FK Rostov,CSKA Moscow,0,0,D,2.82,2.72,3.07,3.1,2.95,3.09,2.78,2.76,2.9
Russia,Premier League,2018/2019,02/12/2018,16:00,Spartak Moscow,Lokomotiv Moscow,2,1,H,2.61,3.09,3.09,2.65,3.22,3.09,2.51,3.1,2.91
Russia,Premier League,2018/2019,03/12/2018,16:30,Arsenal Tula,Zenit,4,2,H,4.57,3.12,2.03,4.84,3.35,2.04,4.22,3.18,1.95
Russia,Premier League,2018/2019,08/12/2018,09:30,FK Krylya Sovetov Samara,FK Rostov,1,0,H,3.4,2.85,2.59,3.74,2.87,2.59,3.32,2.78,2.48
Russia,Premier League,2018/2019,08/12/2018,12:00,CSKA Moscow,Yenisey,2,1,H,1.41,4.16,10.68,1.49,4.5,11.25,1.41,4.1,9.22
Russia,Premier League,2018/2019,08/12/2018,14:30,Lokomotiv Moscow,Orenburg,2,1,H,1.69,3.63,5.92,1.72,3.7,5.92,1.66,3.53,5.58
Russia,Premier League,2018/2019,08/12/2018,17:00,FK Anzi Makhackala,Spartak Moscow,0,3,A,6.84,3.95,1.56,6.84,4,1.7,6.21,3.83,1.56
Russia,Premier League,2018/2019,09/12/2018,11:00,Dynamo Moscow,Ural,4,0,H,2.05,3.11,4.49,2.16,3.16,4.49,2.05,3.01,4.08
Russia,Premier League,2018/2019,09/12/2018,13:30,Krasnodar,Ufa,1,1,D,1.54,3.84,7.71,1.56,4.25,8.05,1.52,3.85,6.92
Russia,Premier League,2018/2019,09/12/2018,16:00,Zenit,Rubin Kazan,1,2,A,1.59,3.68,7.27,1.62,3.75,8,1.57,3.57,6.86
Russia,Premier League,2018/2019,10/12/2018,16:30,Akhmat Grozny,Arsenal Tula,2,0,H,2.4,3.06,3.48,2.4,3.1,3.59,2.33,3,3.33
Russia,Premier League,2018/2019,01/03/2019,13:30,Orenburg,FK Anzi Makhackala,0,1,A,1.44,4.19,9.26,1.47,4.44,9.6,1.42,4.11,8.31
Russia,Premier League,2018/2019,02/03/2019,08:30,Ural,Zenit,0,1,A,4.76,3.39,1.89,5,3.58,1.91,4.46,3.32,1.85
Russia,Premier League,2018/2019,02/03/2019,11:00,Arsenal Tula,CSKA Moscow,2,0,H,5.56,3.68,1.71,5.75,3.7,1.75,5.3,3.48,1.7
Russia,Premier League,2018/2019,02/03/2019,13:30,Lokomotiv Moscow,FK Krylya Sovetov Samara,2,2,D,1.68,3.6,6.18,1.68,3.7,6.2,1.65,3.57,5.59
Russia,Premier League,2018/2019,02/03/2019,16:00,Rubin Kazan,Akhmat Grozny,1,0,H,2.4,2.74,3.91,2.56,2.86,3.92,2.35,2.72,3.63
Russia,Premier League,2018/2019,03/03/2019,08:30,Ufa,Dynamo Moscow,1,2,A,2.96,2.72,3.08,2.96,2.94,3.2,2.77,2.72,2.96
Russia,Premier League,2018/2019,03/03/2019,11:00,Yenisey,FK Rostov,1,1,D,3.73,2.87,2.41,4.1,3,2.41,3.57,2.86,2.29
Russia,Premier League,2018/2019,03/03/2019,16:00,Spartak Moscow,Krasnodar,1,1,D,2.88,3.21,2.69,3,3.29,2.7,2.77,3.12,2.59
Russia,Premier League,2018/2019,09/03/2019,11:00,FK Krylya Sovetov Samara,Yenisey,4,0,H,2.16,2.93,4.4,2.25,3.16,4.4,2.1,2.92,4
Russia,Premier League,2018/2019,09/03/2019,13:30,CSKA Moscow,Rubin Kazan,3,0,H,1.76,3.29,6.09,1.8,3.5,6.7,1.72,3.24,5.66
Russia,Premier League,2018/2019,10/03/2019,11:00,FK Rostov,Arsenal Tula,0,0,D,1.88,3.15,5.43,1.89,3.2,5.5,1.84,3.09,5.02
Russia,Premier League,2018/2019,10/03/2019,13:30,Zenit,Ufa,2,1,H,1.41,4.23,10.64,1.43,4.26,12,1.4,4.07,9.34
Russia,Premier League,2018/2019,10/03/2019,16:00,Dynamo Moscow,Spartak Moscow,0,1,A,2.81,2.84,3.1,2.88,2.95,3.1,2.65,2.82,2.96
Russia,Premier League,2018/2019,10/03/2019,18:00,FK Anzi Makhackala,Lokomotiv Moscow,0,2,A,8.09,4.66,1.42,10,4.66,1.45,8.39,4.32,1.4
Russia,Premier League,2018/2019,11/03/2019,14:30,Akhmat Grozny,Ural,1,1,D,2.07,3.02,4.55,2.17,3.16,4.55,2.02,3.02,4.12
Russia,Premier League,2018/2019,11/03/2019,16:30,Krasnodar,Orenburg,2,2,D,1.53,4.02,7.21,1.56,4.05,7.9,1.52,3.85,6.71
Russia,Premier League,2018/2019,15/03/2019,16:30,FK Anzi Makhackala,FK Krylya Sovetov Samara,0,2,A,8.65,4.47,1.43,12,4.47,1.55,8.22,4.04,1.44
Russia,Premier League,2018/2019,16/03/2019,08:30,Orenburg,Dynamo Moscow,1,0,H,3.02,2.72,2.97,3.06,2.85,2.97,2.89,2.72,2.8
Russia,Premier League,2018/2019,16/03/2019,11:00,Ural,CSKA Moscow,0,1,A,5.18,3.38,1.83,5.35,3.46,1.91,4.75,3.24,1.83
Russia,Premier League,2018/2019,16/03/2019,13:30,Rubin Kazan,FK Rostov,0,2,A,2.9,2.7,3.17,2.92,2.92,3.25,2.78,2.61,3.09
Russia,Premier League,2018/2019,16/03/2019,16:00,Arsenal Tula,Yenisey,2,0,H,1.78,3.65,5.07,1.85,3.8,5.25,1.76,3.45,4.75
Russia,Premier League,2018/2019,17/03/2019,11:00,Ufa,Akhmat Grozny,0,1,A,2.62,2.75,3.5,2.72,2.93,3.5,2.52,2.74,3.26
Russia,Premier League,2018/2019,17/03/2019,13:30,Lokomotiv Moscow,Krasnodar,1,0,H,2.44,3.22,3.21,2.45,4.3,3.21,2.35,3.2,3.05
Russia,Premier League,2018/2019,17/03/2019,16:00,Spartak Moscow,Zenit,1,1,D,2.77,3.22,2.78,2.88,3.27,2.93,2.64,3.12,2.7
Russia,Premier League,2018/2019,29/03/2019,15:30,FK Krylya Sovetov Samara,Arsenal Tula,0,1,A,2.27,3.05,3.8,2.27,3.19,3.86,2.18,3.06,3.57
Russia,Premier League,2018/2019,30/03/2019,08:30,Yenisey,Rubin Kazan,1,1,D,2.94,2.89,2.91,3.1,3.06,2.91,2.87,2.82,2.76
Russia,Premier League,2018/2019,30/03/2019,11:00,Dynamo Moscow,Lokomotiv Moscow,0,1,A,3.24,3.07,2.52,3.34,3.07,2.58,3.12,2.96,2.45
Russia,Premier League,2018/2019,30/03/2019,13:30,Akhmat Grozny,Spartak Moscow,1,3,A,3.11,2.89,2.76,3.14,2.98,2.8,2.96,2.89,2.61
Russia,Premier League,2018/2019,30/03/2019,16:00,FK Rostov,Ural,2,1,H,1.76,3.39,5.8,1.8,3.48,6,1.74,3.29,5.4
Russia,Premier League,2018/2019,31/03/2019,12:00,Zenit,Orenburg,3,1,H,1.43,4.36,8.92,1.48,4.4,9.2,1.44,4.1,7.92
Russia,Premier League,2018/2019,31/03/2019,14:30,CSKA Moscow,Ufa,2,2,D,1.38,4.5,10.34,1.41,4.65,11,1.38,4.29,9.29
Russia,Premier League,2018/2019,31/03/2019,17:00,Krasnodar,FK Anzi Makhackala,5,0,H,1.09,10.61,30.87,1.14,10.61,36,1.09,8.86,28.19
Russia,Premier League,2018/2019,03/04/2019,15:00,Orenburg,FK Krylya Sovetov Samara,3,1,H,2.4,2.95,3.61,2.49,3.02,3.61,2.34,2.91,3.38
Russia,Premier League,2018/2019,06/04/2019,12:00,FK Anzi Makhackala,Dynamo Moscow,1,1,D,10.08,5.32,1.32,12.5,5.32,1.39,9.79,4.63,1.34
Russia,Premier League,2018/2019,06/04/2019,14:30,Krasnodar,FK Krylya Sovetov Samara,1,0,H,1.37,5.12,8.4,1.42,5.12,9.5,1.39,4.59,7.84
Russia,Premier League,2018/2019,06/04/2019,17:00,Spartak Moscow,CSKA Moscow,0,2,A,3.35,3.33,2.31,3.46,3.33,2.4,3.21,3.15,2.28
Russia,Premier League,2018/2019,07/04/2019,09:30,Ufa,FK Rostov,1,0,H,3.11,2.8,2.84,3.38,2.8,2.9,3.02,2.68,2.76
Russia,Premier League,2018/2019,07/04/2019,12:00,Ural,Yenisey,3,2,H,1.77,3.6,5.19,1.81,3.6,5.95,1.75,3.39,4.97
Russia,Premier League,2018/2019,07/04/2019,14:30,Rubin Kazan,Arsenal Tula,0,0,D,2.75,2.65,3.44,2.75,2.9,3.6,2.54,2.74,3.26
Russia,Premier League,2018/2019,07/04/2019,17:00,Lokomotiv Moscow,Zenit,1,1,D,2.71,3.04,3.01,2.8,3.25,3.05,2.59,3.06,2.83
Russia,Premier League,2018/2019,08/04/2019,15:00,Orenburg,Akhmat Grozny,1,3,A,2.5,2.91,3.49,2.62,2.91,3.84,2.45,2.8,3.33
Russia,Premier League,2018/2019,12/04/2019,16:30,FK Krylya Sovetov Samara,Rubin Kazan,1,0,H,2.2,2.86,4.36,2.4,3.07,4.36,2.23,2.79,3.88
Russia,Premier League,2018/2019,13/04/2019,09:30,Yenisey,Ufa,0,0,D,3.13,2.81,2.81,3.13,3.06,2.92,2.91,2.82,2.73
Russia,Premier League,2018/2019,13/04/2019,12:00,Arsenal Tula,Ural,0,0,D,2.06,3.34,4.04,2.14,3.46,4.1,2.03,3.23,3.83
Russia,Premier League,2018/2019,13/04/2019,12:00,CSKA Moscow,Orenburg,2,3,A,1.38,4.73,9.58,1.43,4.73,10,1.39,4.32,8.59
Russia,Premier League,2018/2019,13/04/2019,17:30,Akhmat Grozny,Lokomotiv Moscow,1,3,A,3.32,2.9,2.6,3.52,2.96,2.6,3.16,2.84,2.51
Russia,Premier League,2018/2019,14/04/2019,12:00,Dynamo Moscow,Krasnodar,1,1,D,3.17,3.19,2.49,3.6,3.24,2.49,3.19,3.12,2.32
Russia,Premier League,2018/2019,14/04/2019,14:30,Zenit,FK Anzi Makhackala,5,0,H,1.04,14.57,31.18,1.07,20,90,1.04,13.88,42.44
Russia,Premier League,2018/2019,14/04/2019,17:00,FK Rostov,Spartak Moscow,2,1,H,2.61,2.98,3.2,2.91,3.03,3.2,2.59,2.92,2.97
Russia,Premier League,2018/2019,19/04/2019,17:30,FK Anzi Makhackala,Akhmat Grozny,0,1,A,7.45,3.48,1.56,8,4.6,1.58,6.93,3.71,1.53
Russia,Premier League,2018/2019,20/04/2019,09:30,Ufa,Arsenal Tula,1,2,A,2.66,2.71,3.51,2.69,2.87,3.53,2.51,2.76,3.26
Russia,Premier League,2018/2019,20/04/2019,12:00,Orenburg,FK Rostov,3,0,H,3.13,2.75,2.88,3.15,3,2.9,2.95,2.73,2.76
Russia,Premier League,2018/2019,20/04/2019,14:30,Dynamo Moscow,FK Krylya Sovetov Samara,1,0,H,1.78,3.61,5.14,1.84,3.61,5.8,1.77,3.33,4.99
Russia,Premier League,2018/2019,20/04/2019,17:00,Lokomotiv Moscow,CSKA Moscow,1,1,D,2.84,2.98,2.92,2.93,3.07,3.15,2.7,2.95,2.79
Russia,Premier League,2018/2019,20/04/2019,19:00,Krasnodar,Zenit,2,3,A,2.44,3.2,3.25,2.54,3.24,3.3,2.37,3.13,3.1
Russia,Premier League,2018/2019,21/04/2019,14:30,Ural,Rubin Kazan,2,1,H,2.74,2.79,3.26,2.74,2.94,3.5,2.57,2.76,3.16
Russia,Premier League,2018/2019,21/04/2019,17:00,Spartak Moscow,Yenisey,2,0,H,1.31,5.39,10.36,1.36,5.5,12.5,1.31,5,9.85
Russia,Premier League,2018/2019,24/04/2019,17:00,Akhmat Grozny,Krasnodar,1,1,D,3.9,3.45,2.06,4.58,3.45,2.2,3.68,3.3,2.04
Russia,Premier League,2018/2019,24/04/2019,17:00,FK Rostov,Lokomotiv Moscow,1,2,A,3.39,2.85,2.6,3.76,2.91,2.65,3.19,2.83,2.49
Russia,Premier League,2018/2019,24/04/2019,17:30,CSKA Moscow,FK Anzi Makhackala,2,0,H,1.05,9.78,18.63,1.1,14,34,1.07,11.3,24.35
Russia,Premier League,2018/2019,24/04/2019,17:30,Rubin Kazan,Ufa,1,1,D,2.4,2.82,3.85,2.4,2.93,3.9,2.33,2.74,3.66
Russia,Premier League,2018/2019,24/04/2019,19:00,Zenit,Dynamo Moscow,2,0,H,1.6,3.87,6.5,1.64,4.08,6.8,1.58,3.76,5.98
Russia,Premier League,2018/2019,25/04/2019,14:00,Yenisey,Orenburg,2,1,H,3.7,3.1,2.28,4.16,3.14,2.3,3.52,3.02,2.22
Russia,Premier League,2018/2019,25/04/2019,16:30,FK Krylya Sovetov Samara,Ural,0,1,A,2.3,3.02,3.76,2.3,3.2,3.84,2.21,3.02,3.55
Russia,Premier League,2018/2019,25/04/2019,18:30,Arsenal Tula,Spartak Moscow,3,0,H,2.88,3.25,2.66,3.14,3.28,2.72,2.82,3.14,2.54
Russia,Premier League,2018/2019,27/04/2019,14:30,FK Anzi Makhackala,FK Rostov,1,1,D,8.56,4.1,1.34,10,4.85,1.47,8.65,4.23,1.39
Russia,Premier League,2018/2019,27/04/2019,17:00,Dynamo Moscow,Akhmat Grozny,0,0,D,1.79,3.52,5.21,1.9,3.52,5.5,1.81,3.23,4.9
Russia,Premier League,2018/2019,28/04/2019,09:30,Ufa,Ural,4,1,H,2.64,3.3,2.87,2.8,3.3,3,2.63,3.12,2.75
Russia,Premier League,2018/2019,28/04/2019,12:00,Lokomotiv Moscow,Yenisey,2,1,H,1.28,5.36,12.79,1.32,5.55,16,1.29,5.11,11.05
Russia,Premier League,2018/2019,28/04/2019,14:30,Zenit,FK Krylya Sovetov Samara,4,2,H,1.34,5.12,10.1,1.36,5.2,12,1.33,4.88,9.28
Russia,Premier League,2018/2019,28/04/2019,17:00,Krasnodar,CSKA Moscow,2,0,H,2.63,3.14,3.02,2.93,3.26,3.1,2.56,3.1,2.84
Russia,Premier League,2018/2019,29/04/2019,15:00,Orenburg,Arsenal Tula,1,1,D,2.82,3,2.91,3.11,3.1,2.91,2.7,2.98,2.78
Russia,Premier League,2018/2019,29/04/2019,17:30,Spartak Moscow,Rubin Kazan,1,1,D,1.84,3.19,5.65,1.86,3.58,6.15,1.73,3.3,5.42
Russia,Premier League,2018/2019,03/05/2019,12:00,Yenisey,FK Anzi Makhackala,3,1,H,1.49,3.8,6.03,1.65,4.1,6.55,1.57,3.8,5.86
Russia,Premier League,2018/2019,03/05/2019,14:30,Rubin Kazan,Orenburg,2,0,H,2.24,3.07,3.86,2.3,3.07,4.1,2.15,2.89,3.91
Russia,Premier League,2018/2019,04/05/2019,12:00,Ural,Spartak Moscow,0,1,A,3.13,3.26,2.47,3.42,3.3,2.47,3,3.17,2.39
Russia,Premier League,2018/2019,04/05/2019,14:30,Akhmat Grozny,Zenit,1,1,D,4.23,3.24,2.05,4.74,3.4,2.07,3.91,3.21,2.01
Russia,Premier League,2018/2019,04/05/2019,17:00,Arsenal Tula,Lokomotiv Moscow,2,0,H,3.77,3.37,2.13,4,3.37,2.25,3.58,3.17,2.12
Russia,Premier League,2018/2019,05/05/2019,12:00,FK Krylya Sovetov Samara,Ufa,1,1,D,2.72,2.95,3.09,2.72,3.04,3.4,2.53,2.89,3.08
Russia,Premier League,2018/2019,05/05/2019,14:30,CSKA Moscow,Dynamo Moscow,2,2,D,1.79,3.53,5.18,1.85,3.55,5.55,1.78,3.4,4.75
Russia,Premier League,2018/2019,05/05/2019,17:00,FK Rostov,Krasnodar,1,1,D,3.56,3.23,2.27,3.62,3.48,2.3,3.33,3.14,2.24
Russia,Premier League,2018/2019,10/05/2019,09:30,Orenburg,Ural,2,2,D,2.36,2.95,3.73,2.55,3,3.73,2.35,2.85,3.45
Russia,Premier League,2018/2019,10/05/2019,12:00,Dynamo Moscow,FK Rostov,0,0,D,1.85,3.31,5.23,1.97,3.31,5.25,1.85,3.12,4.84
Russia,Premier League,2018/2019,10/05/2019,14:30,FK Anzi Makhackala,Arsenal Tula,0,1,A,8.57,4.33,1.39,10.6,4.85,1.45,8.52,4.38,1.38
Russia,Premier League,2018/2019,10/05/2019,17:00,Lokomotiv Moscow,Rubin Kazan,4,0,H,1.55,3.82,7.6,1.6,3.82,8.2,1.55,3.59,7.07
Russia,Premier League,2018/2019,11/05/2019,12:00,Yenisey,Krasnodar,0,4,A,7.86,4.95,1.4,11,5.06,1.49,7.33,4.4,1.42
Russia,Premier League,2018/2019,11/05/2019,14:30,Akhmat Grozny,FK Krylya Sovetov Samara,2,1,H,2.24,3.19,3.68,2.38,3.19,3.75,2.21,3.07,3.46
Russia,Premier League,2018/2019,12/05/2019,14:30,Spartak Moscow,Ufa,1,0,H,1.95,3.36,4.48,1.96,3.55,5.45,1.85,3.35,4.42
Russia,Premier League,2018/2019,12/05/2019,17:00,Zenit,CSKA Moscow,3,1,H,2.22,3.33,3.55,2.4,3.35,3.96,2.18,3.22,3.37
Russia,Premier League,2018/2019,18/05/2019,12:00,Ufa,Orenburg,0,2,A,1.72,3.68,5.43,1.75,3.8,5.95,1.68,3.5,5.46
Russia,Premier League,2018/2019,18/05/2019,14:30,CSKA Moscow,Akhmat Grozny,1,0,H,1.43,4.76,7.74,1.47,4.8,8.2,1.41,4.47,7.49
Russia,Premier League,2018/2019,18/05/2019,17:00,FK Krylya Sovetov Samara,Spartak Moscow,1,2,A,3.51,3.28,2.26,4.06,3.28,2.35,3.31,3.14,2.23
Russia,Premier League,2018/2019,19/05/2019,09:30,Ural,Lokomotiv Moscow,2,2,D,7.49,4.34,1.48,10,4.56,1.49,7.2,4.21,1.45
Russia,Premier League,2018/2019,19/05/2019,12:00,Yenisey,Dynamo Moscow,2,2,D,6.03,3.65,1.68,6.03,3.7,1.82,5.46,3.54,1.66
Russia,Premier League,2018/2019,19/05/2019,14:30,Arsenal Tula,Krasnodar,0,3,A,3.98,3.52,2.01,4.42,3.55,2.04,3.8,3.34,1.98
Russia,Premier League,2018/2019,19/05/2019,17:00,FK Rostov,Zenit,1,0,H,2.65,3.31,2.84,2.99,3.36,2.95,2.59,3.15,2.74
Russia,Premier League,2018/2019,20/05/2019,17:00,Rubin Kazan,FK Anzi Makhackala,0,0,D,1.23,6.26,11,1.31,6.8,17,1.23,5.84,12.22
Russia,Premier League,2018/2019,26/05/2019,12:00,Akhmat Grozny,FK Rostov,1,0,H,2.32,3.12,3.58,2.45,3.24,3.58,2.27,3.08,3.32
Russia,Premier League,2018/2019,26/05/2019,12:00,CSKA Moscow,FK Krylya Sovetov Samara,6,0,H,1.26,5.89,12.69,1.31,6.17,15,1.25,5.5,11.69
Russia,Premier League,2018/2019,26/05/2019,12:00,Dynamo Moscow,Arsenal Tula,3,3,D,1.74,3.73,5.17,1.94,3.73,5.4,1.78,3.47,4.63
Russia,Premier League,2018/2019,26/05/2019,12:00,FK Anzi Makhackala,Ural,0,2,A,4.94,4.08,1.63,5.5,4.1,1.83,4.79,3.79,1.69
Russia,Premier League,2018/2019,26/05/2019,12:00,Krasnodar,Rubin Kazan,1,0,H,1.29,5.69,10.46,1.32,5.85,14,1.29,5.18,10.21
Russia,Premier League,2018/2019,26/05/2019,12:00,Lokomotiv Moscow,Ufa,1,0,H,1.24,5.79,15.25,1.29,6.2,15.25,1.25,5.41,12.27
Russia,Premier League,2018/2019,26/05/2019,12:00,Orenburg,Spartak Moscow,2,0,H,3.35,3.63,2.18,4.12,3.63,2.18,3.36,3.47,2.09
Russia,Premier League,2018/2019,26/05/2019,12:00,Zenit,Yenisey,4,1,H,1.17,7.95,15.23,1.18,8.5,19,1.15,7.58,15.2
Russia,Premier League,2018/2019,30/05/2019,15:00,Ufa,Tomsk,2,0,H,1.44,4.12,9.78,1.46,4.3,10.5,1.41,4,9.26
Russia,Premier League,2018/2019,30/05/2019,17:00,Nizhny Novgorod,FK Krylya Sovetov Samara,1,3,A,3.35,2.85,2.62,3.72,3.02,2.66,3.3,2.82,2.43
Russia,Premier League,2018/2019,02/06/2019,12:00,Tomsk,Ufa,1,0,H,3.63,2.83,2.48,3.87,3,2.5,3.5,2.79,2.36
Russia,Premier League,2018/2019,02/06/2019,15:00,FK Krylya Sovetov Samara,Nizhny Novgorod,0,1,A,1.65,3.84,5.92,1.72,3.95,7.7,1.62,3.7,5.59
Russia,Premier League,2019/2020,12/07/2019,18:00,Arsenal Tula,Dynamo Moscow,1,1,D,3.4,2.99,2.37,3.7,3.07,2.55,3.33,2.93,2.36
Russia,Premier League,2019/2020,13/07/2019,14:30,Ural,Ufa,3,2,H,2.1,3.14,3.92,2.26,3.3,4,2.15,3.02,3.72
Russia,Premier League,2019/2020,13/07/2019,17:00,Spartak Moscow,Sochi,1,0,H,1.41,4.63,7.33,1.45,5.05,9.4,1.41,4.52,7.46
Russia,Premier League,2019/2020,13/07/2019,19:30,FK Rostov,Orenburg,2,1,H,2.15,2.97,4.01,2.17,3.22,5.1,2.06,3,4.06
Russia,Premier League,2019/2020,14/07/2019,14:30,FK Krylya Sovetov Samara,CSKA Moscow,2,0,H,5.1,3.24,1.83,5.15,3.62,1.9,4.77,3.28,1.81
Russia,Premier League,2019/2020,14/07/2019,17:00,Zenit,Tambov,2,1,H,1.17,6.95,14.83,1.22,8.4,19,1.17,7.03,14.22
Russia,Premier League,2019/2020,14/07/2019,19:30,Akhmat Grozny,Krasnodar,1,0,H,3.3,3.29,2.25,4.1,3.33,2.32,3.39,3.2,2.18
Russia,Premier League,2019/2020,15/07/2019,18:00,Lokomotiv Moscow,Rubin Kazan,1,1,D,1.54,3.63,7.35,1.61,4.5,8.5,1.55,3.69,6.76
Russia,Premier League,2019/2020,20/07/2019,12:00,Ufa,Krasnodar,2,3,A,4.71,3.47,1.87,5.15,3.47,1.91,4.48,3.32,1.85
Russia,Premier League,2019/2020,20/07/2019,14:30,FK Krylya Sovetov Samara,Arsenal Tula,2,3,A,2.34,3.03,3.61,2.44,3.13,3.61,2.31,2.99,3.35
Russia,Premier League,2019/2020,20/07/2019,17:00,CSKA Moscow,Orenburg,2,1,H,1.42,4.46,8.87,1.45,4.5,12.5,1.41,4.18,8.65
Russia,Premier League,2019/2020,20/07/2019,19:30,FK Rostov,Spartak Moscow,2,2,D,2.49,3.06,3.26,2.63,3.2,3.3,2.45,2.99,3.1
Russia,Premier League,2019/2020,21/07/2019,12:00,Ural,Akhmat Grozny,3,0,H,2.88,3.06,2.77,2.92,3.15,3.04,2.77,2.97,2.73
Russia,Premier League,2019/2020,21/07/2019,14:30,Lokomotiv Moscow,Tambov,2,1,H,1.31,4.97,12.66,1.38,5.05,13.5,1.32,4.64,10.6
Russia,Premier League,2019/2020,21/07/2019,17:00,Dynamo Moscow,Rubin Kazan,0,1,A,1.74,3.44,5.81,1.84,3.44,6.3,1.75,3.27,5.36
Russia,Premier League,2019/2020,21/07/2019,19:30,Sochi,Zenit,0,2,A,4.99,3.69,1.77,6.2,3.88,1.81,4.86,3.61,1.72
Russia,Premier League,2019/2020,26/07/2019,18:00,Dynamo Moscow,Ural,2,0,H,1.7,3.8,5.37,1.77,3.86,5.5,1.68,3.63,5.09
Russia,Premier League,2019/2020,27/07/2019,12:00,Ufa,FK Krylya Sovetov Samara,2,1,H,2.42,3,3.47,2.48,3.2,3.5,2.37,2.96,3.25
Russia,Premier League,2019/2020,27/07/2019,14:30,Tambov,Spartak Moscow,2,0,H,4.82,3.45,1.86,5.15,3.6,1.88,4.57,3.38,1.82
Russia,Premier League,2019/2020,27/07/2019,17:00,Krasnodar,Sochi,3,0,H,1.35,5.24,9.17,1.37,5.3,9.6,1.34,4.91,8.35
Russia,Premier League,2019/2020,28/07/2019,12:00,Orenburg,Zenit,0,2,A,5.44,3.8,1.69,6.7,3.94,1.73,5.29,3.63,1.67
Russia,Premier League,2019/2020,28/07/2019,14:30,Arsenal Tula,FK Rostov,2,3,A,3.03,3.04,2.67,3.15,3.1,2.68,2.91,2.98,2.58
Russia,Premier League,2019/2020,28/07/2019,17:00,CSKA Moscow,Lokomotiv Moscow,1,0,H,2.22,3.26,3.6,2.28,3.42,3.8,2.16,3.22,3.43
Russia,Premier League,2019/2020,29/07/2019,18:00,Rubin Kazan,Akhmat Grozny,1,0,H,2.82,2.94,2.95,2.88,2.96,3.04,2.76,2.83,2.85
Russia,Premier League,2019/2020,03/08/2019,12:00,Ural,FK Rostov,2,2,D,2.95,3.09,2.68,3.11,3.28,2.8,2.85,3.05,2.57
Russia,Premier League,2019/2020,03/08/2019,14:30,FK Krylya Sovetov Samara,Lokomotiv Moscow,1,2,A,4.41,3.33,1.97,4.58,3.44,1.99,4.1,3.24,1.94
Russia,Premier League,2019/2020,03/08/2019,17:00,Spartak Moscow,Dynamo Moscow,0,0,D,2.94,3.15,2.65,2.94,3.2,3.12,2.81,3.08,2.59
Russia,Premier League,2019/2020,03/08/2019,19:30,Zenit,Krasnodar,1,1,D,1.72,4.16,4.65,1.78,4.16,5.1,1.7,3.92,4.47
Russia,Premier League,2019/2020,04/08/2019,14:30,Tambov,Arsenal Tula,0,1,A,2.8,3.11,2.81,2.95,3.19,3,2.64,3,2.81
Russia,Premier League,2019/2020,04/08/2019,17:00,Rubin Kazan,CSKA Moscow,0,1,A,3.94,3.31,2.09,4.48,3.34,2.15,3.86,3.16,2.05
Russia,Premier League,2019/2020,04/08/2019,19:30,Sochi,Ufa,0,0,D,2.43,3.07,3.37,2.48,3.28,3.45,2.34,3.02,3.24
Russia,Premier League,2019/2020,05/08/2019,18:00,Akhmat Grozny,Orenburg,2,1,H,1.85,3.53,4.68,1.9,3.6,5.25,1.83,3.35,4.5
Russia,Premier League,2019/2020,10/08/2019,12:00,Orenburg,Tambov,2,2,D,1.97,3.25,4.57,2.03,3.4,4.6,1.93,3.2,4.25
Russia,Premier League,2019/2020,10/08/2019,17:00,Dynamo Moscow,Zenit,0,2,A,3.4,3.22,2.33,4.14,3.32,2.33,3.43,3.17,2.17
Russia,Premier League,2019/2020,10/08/2019,17:00,Krasnodar,Rubin Kazan,1,0,H,1.54,4.02,6.97,1.61,4.02,7.4,1.54,3.82,6.32
Russia,Premier League,2019/2020,11/08/2019,12:00,Arsenal Tula,Ufa,1,0,H,2.27,3.01,3.82,2.28,3.3,3.92,2.18,3.02,3.63
Russia,Premier League,2019/2020,11/08/2019,14:30,Lokomotiv Moscow,Ural,4,0,H,1.39,4.83,8.81,1.45,4.83,10.5,1.39,4.52,8.01
Russia,Premier League,2019/2020,11/08/2019,17:00,CSKA Moscow,Sochi,0,0,D,1.39,4.65,9.31,1.42,4.8,11,1.37,4.54,8.56
Russia,Premier League,2019/2020,11/08/2019,19:30,Akhmat Grozny,Spartak Moscow,1,3,A,2.38,3.39,3.13,2.58,3.44,3.3,2.32,3.22,3.07
Russia,Premier League,2019/2020,12/08/2019,18:00,FK Rostov,FK Krylya Sovetov Samara,1,0,H,1.59,3.91,6.42,1.63,4,7.7,1.58,3.79,5.9
Russia,Premier League,2019/2020,16/08/2019,16:00,Orenburg,Sochi,1,1,D,2.32,3.24,3.4,2.38,3.26,3.6,2.26,3.12,3.29
Russia,Premier League,2019/2020,17/08/2019,12:00,Ural,FK Krylya Sovetov Samara,1,3,A,2.47,3.17,3.18,2.47,3.27,3.9,2.31,3.14,3.18
Russia,Premier League,2019/2020,17/08/2019,14:30,Tambov,Krasnodar,0,2,A,5.15,3.54,1.78,5.45,3.85,1.8,4.8,3.51,1.75
Russia,Premier League,2019/2020,17/08/2019,17:00,Zenit,Akhmat Grozny,0,0,D,1.33,5.22,10.14,1.36,5.4,12,1.32,4.94,9.42
Russia,Premier League,2019/2020,18/08/2019,12:00,Rubin Kazan,Arsenal Tula,1,0,H,2.37,2.99,3.58,2.44,3.1,3.84,2.29,2.97,3.42
Russia,Premier League,2019/2020,18/08/2019,14:30,Ufa,FK Rostov,2,0,H,2.93,2.98,2.8,3.28,3.09,2.92,2.91,2.92,2.62
Russia,Premier League,2019/2020,18/08/2019,17:00,Dynamo Moscow,Lokomotiv Moscow,1,2,A,3.31,3.2,2.38,3.72,3.22,2.64,3.13,3.06,2.38
Russia,Premier League,2019/2020,19/08/2019,18:00,Spartak Moscow,CSKA Moscow,2,1,H,2.8,3.15,2.77,2.85,3.28,2.97,2.73,3.1,2.65
Russia,Premier League,2019/2020,24/08/2019,12:00,Tambov,Dynamo Moscow,0,2,A,4.38,3.17,2.04,4.75,3.3,2.08,4.04,3.11,2.01
Russia,Premier League,2019/2020,24/08/2019,14:30,Ufa,Zenit,1,0,H,5.91,3.71,1.67,6.35,3.75,1.7,5.51,3.55,1.66
Russia,Premier League,2019/2020,24/08/2019,17:00,Krasnodar,Lokomotiv Moscow,1,1,D,2.71,3.34,2.73,2.95,3.35,2.8,2.66,3.2,2.64
Russia,Premier League,2019/2020,25/08/2019,14:30,CSKA Moscow,Akhmat Grozny,3,0,H,1.54,3.98,7.1,1.62,3.98,8,1.53,3.76,6.65
Russia,Premier League,2019/2020,25/08/2019,17:00,FK Krylya Sovetov Samara,Spartak Moscow,1,2,A,2.83,3.21,2.71,3.22,3.23,2.76,2.82,3.11,2.56
Russia,Premier League,2019/2020,25/08/2019,17:00,FK Rostov,Rubin Kazan,2,1,H,1.85,3.34,5.08,2,3.36,5.08,1.86,3.22,4.6
Russia,Premier League,2019/2020,25/08/2019,19:30,Arsenal Tula,Orenburg,2,1,H,2.1,3.25,3.97,2.14,3.3,4.34,2.07,3.15,3.77
Russia,Premier League,2019/2020,26/08/2019,16:00,Ural,Sochi,3,1,H,2.47,3.18,3.17,2.5,3.23,3.48,2.38,3.11,3.08
Russia,Premier League,2019/2020,30/08/2019,18:00,FK Krylya Sovetov Samara,Dynamo Moscow,0,0,D,3.88,3.2,2.15,3.95,3.25,2.4,3.58,3.07,2.17
Russia,Premier League,2019/2020,31/08/2019,09:30,Ufa,Orenburg,1,2,A,2.57,2.75,3.54,2.6,3.05,3.72,2.42,2.8,3.37
Russia,Premier League,2019/2020,31/08/2019,12:00,Rubin Kazan,Sochi,0,3,A,2.21,3.06,3.9,2.21,3.3,4.46,2.09,3.06,3.83
Russia,Premier League,2019/2020,31/08/2019,14:30,Lokomotiv Moscow,FK Rostov,1,2,A,1.75,3.63,5.26,1.88,3.7,5.9,1.74,3.48,4.93
Russia,Premier League,2019/2020,31/08/2019,17:00,Akhmat Grozny,Tambov,1,1,D,2.03,3.12,4.52,2.09,3.6,5,1.98,3.13,4.16
Russia,Premier League,2019/2020,01/09/2019,12:00,Ural,Krasnodar,2,4,A,3.61,3.72,2.05,3.8,3.72,2.1,3.5,3.5,2.02
Russia,Premier League,2019/2020,01/09/2019,14:30,Arsenal Tula,CSKA Moscow,1,2,A,4.54,3.61,1.86,4.7,3.61,2.11,4.34,3.39,1.85
Russia,Premier League,2019/2020,01/09/2019,17:00,Spartak Moscow,Zenit,0,1,A,3.48,3.5,2.17,3.6,3.52,2.58,3.28,3.34,2.17
Russia,Premier League,2019/2020,13/09/2019,18:00,Zenit,Arsenal Tula,3,1,H,1.3,5.42,11.62,1.33,5.6,12,1.29,5.07,10.41
Russia,Premier League,2019/2020,14/09/2019,14:30,Spartak Moscow,Ural,1,2,A,1.49,4.36,7.09,1.52,4.5,8.8,1.49,4.13,6.52
Russia,Premier League,2019/2020,14/09/2019,17:00,Sochi,Lokomotiv Moscow,0,1,A,4.58,3.56,1.87,5.25,3.56,1.93,4.28,3.42,1.85
Russia,Premier League,2019/2020,15/09/2019,12:00,Orenburg,Rubin Kazan,2,1,H,2.09,3.32,3.91,2.22,3.32,3.92,2.07,3.19,3.7
Russia,Premier League,2019/2020,15/09/2019,14:30,Tambov,CSKA Moscow,0,2,A,7.68,4.33,1.47,8,4.4,1.57,7.18,4.12,1.46
Russia,Premier League,2019/2020,15/09/2019,17:00,Krasnodar,FK Krylya Sovetov Samara,4,2,H,1.47,4.37,7.53,1.51,4.6,8.8,1.45,4.29,7
Russia,Premier League,2019/2020,16/09/2019,18:00,Dynamo Moscow,Ufa,0,0,D,1.65,3.62,6.43,1.67,3.9,7.8,1.6,3.59,6.17
Russia,Premier League,2019/2020,16/09/2019,18:30,FK Rostov,Akhmat Grozny,2,1,H,1.7,3.68,5.6,1.74,3.8,6.2,1.66,3.57,5.37
Russia,Premier League,2019/2020,20/09/2019,15:30,Ufa,Spartak Moscow,1,0,H,3.36,3.06,2.44,3.76,3.15,2.44,3.3,3.03,2.32
Russia,Premier League,2019/2020,21/09/2019,12:00,Akhmat Grozny,FK Krylya Sovetov Samara,1,1,D,2.07,3.41,3.87,2.14,3.41,4.62,2.05,3.22,3.74
Russia,Premier League,2019/2020,21/09/2019,17:00,Tambov,FK Rostov,2,1,H,5.27,3.81,1.71,5.5,3.81,1.9,4.81,3.49,1.75
Russia,Premier League,2019/2020,21/09/2019,17:00,Zenit,Rubin Kazan,5,0,H,1.27,5.79,11.88,1.31,5.79,15,1.28,5.25,10.92
Russia,Premier League,2019/2020,22/09/2019,09:30,Orenburg,Lokomotiv Moscow,2,3,A,3.3,3.23,2.37,3.64,3.29,2.37,3.24,3.16,2.26
Russia,Premier League,2019/2020,22/09/2019,12:00,Dynamo Moscow,Sochi,2,3,A,1.66,3.81,5.79,1.71,3.85,6.15,1.63,3.63,5.6
Russia,Premier League,2019/2020,22/09/2019,14:30,Arsenal Tula,Ural,1,1,D,2.04,3.41,3.98,2.12,3.5,3.98,2.03,3.32,3.68
Russia,Premier League,2019/2020,22/09/2019,17:00,CSKA Moscow,Krasnodar,3,2,H,2.13,3.55,3.53,2.18,3.55,3.75,2.1,3.37,3.42
Russia,Premier League,2019/2020,28/09/2019,12:00,FK Krylya Sovetov Samara,Tambov,2,0,H,1.93,3.46,4.46,1.95,3.66,4.5,1.89,3.36,4.2
Russia,Premier League,2019/2020,28/09/2019,14:30,FK Rostov,Dynamo Moscow,3,0,H,2.18,3.29,3.68,2.22,3.46,3.85,2.13,3.2,3.54
Russia,Premier League,2019/2020,28/09/2019,17:00,Lokomotiv Moscow,Zenit,1,0,H,3.05,3.22,2.52,3.05,3.36,2.58,2.9,3.18,2.44
Russia,Premier League,2019/2020,29/09/2019,09:30,Ural,CSKA Moscow,0,3,A,4.73,4.13,1.71,5.65,4.13,1.83,4.65,3.79,1.7
Russia,Premier League,2019/2020,29/09/2019,12:00,Rubin Kazan,Ufa,0,0,D,2.79,2.95,2.96,2.81,2.98,3.4,2.67,2.85,2.92
Russia,Premier League,2019/2020,29/09/2019,14:30,Spartak Moscow,Orenburg,1,2,A,1.75,3.85,4.83,1.8,3.85,4.96,1.74,3.63,4.61
Russia,Premier League,2019/2020,29/09/2019,17:00,Krasnodar,Arsenal Tula,2,0,H,1.48,4.55,6.99,1.51,4.64,7.3,1.47,4.36,6.39
Russia,Premier League,2019/2020,30/09/2019,17:30,Sochi,Akhmat Grozny,2,0,H,2.26,3.12,3.67,2.26,3.3,3.8,2.18,3.1,3.52
Russia,Premier League,2019/2020,05/10/2019,09:30,Ufa,Akhmat Grozny,0,1,A,2.34,2.98,3.67,2.42,3.1,3.92,2.28,2.9,3.53
Russia,Premier League,2019/2020,05/10/2019,12:00,Orenburg,Dynamo Moscow,2,0,H,3.07,3.14,2.56,3.36,3.2,2.7,2.95,3.05,2.5
Russia,Premier League,2019/2020,05/10/2019,14:30,Rubin Kazan,Tambov,2,1,H,2.06,3.25,4.13,2.12,3.3,4.13,2.03,3.11,3.94
Russia,Premier League,2019/2020,05/10/2019,17:00,Sochi,FK Krylya Sovetov Samara,0,2,A,2.16,3.3,3.72,2.21,3.42,3.85,2.1,3.23,3.55
Russia,Premier League,2019/2020,06/10/2019,09:30,Ural,Zenit,1,3,A,6.28,4.52,1.52,7.4,4.64,1.57,6.13,4.29,1.49
Russia,Premier League,2019/2020,06/10/2019,12:00,Lokomotiv Moscow,Arsenal Tula,2,1,H,1.6,4.04,6.07,1.62,4.25,7.4,1.56,3.91,5.84
Russia,Premier League,2019/2020,06/10/2019,14:30,CSKA Moscow,FK Rostov,1,3,A,1.68,3.96,5.3,1.86,3.96,5.6,1.69,3.71,4.94
Russia,Premier League,2019/2020,06/10/2019,17:00,Krasnodar,Spartak Moscow,2,1,H,1.82,3.84,4.43,1.82,4,4.8,1.78,3.72,4.28
Russia,Premier League,2019/2020,18/10/2019,17:30,Akhmat Grozny,Lokomotiv Moscow,0,2,A,2.75,3.24,2.76,2.91,3.25,2.9,2.67,3.12,2.69
Russia,Premier League,2019/2020,19/10/2019,12:00,Tambov,Ural,1,2,A,2.81,3.14,2.77,2.81,3.3,2.9,2.68,3.13,2.67
Russia,Premier League,2019/2020,19/10/2019,14:30,Spartak Moscow,Rubin Kazan,0,0,D,1.61,4.05,5.89,1.63,4.15,5.9,1.6,3.9,5.4
Russia,Premier League,2019/2020,19/10/2019,17:00,Zenit,FK Rostov,6,1,H,1.48,4.47,7.13,1.59,4.6,8.5,1.46,4.3,6.72
Russia,Premier League,2019/2020,20/10/2019,09:30,Orenburg,FK Krylya Sovetov Samara,0,1,A,2.32,3.36,3.26,2.45,3.48,3.36,2.26,3.27,3.15
Russia,Premier League,2019/2020,20/10/2019,12:00,Ufa,CSKA Moscow,1,1,D,5.31,3.48,1.78,5.75,3.58,1.8,5.03,3.39,1.75
Russia,Premier League,2019/2020,20/10/2019,14:30,Arsenal Tula,Sochi,1,1,D,2.16,3.38,3.61,2.18,3.4,4.44,2.11,3.27,3.47
Russia,Premier League,2019/2020,20/10/2019,17:00,Dynamo Moscow,Krasnodar,1,1,D,2.63,3.4,2.77,2.81,3.44,2.77,2.6,3.24,2.67
Russia,Premier League,2019/2020,25/10/2019,17:30,Rubin Kazan,Ural,0,0,D,2.18,3.51,3.44,2.36,3.51,3.75,2.19,3.31,3.26
Russia,Premier League,2019/2020,26/10/2019,12:00,Tambov,Ufa,3,0,H,2.72,2.97,3.02,2.86,3.09,3.05,2.66,2.86,2.91
Russia,Premier League,2019/2020,26/10/2019,14:30,Akhmat Grozny,Arsenal Tula,1,1,D,2.36,3.32,3.23,2.42,3.32,3.35,2.31,3.18,3.11
Russia,Premier League,2019/2020,26/10/2019,17:00,FK Rostov,Sochi,2,0,H,1.62,3.9,6.12,1.66,4.05,8.1,1.6,3.81,5.64
Russia,Premier League,2019/2020,27/10/2019,11:00,FK Krylya Sovetov Samara,Zenit,0,2,A,5.13,3.65,1.76,5.6,3.85,1.76,4.8,3.63,1.72
Russia,Premier League,2019/2020,27/10/2019,13:30,CSKA Moscow,Dynamo Moscow,0,1,A,1.93,3.51,4.35,1.97,3.74,4.68,1.87,3.44,4.18
Russia,Premier League,2019/2020,27/10/2019,13:30,Lokomotiv Moscow,Spartak Moscow,0,3,A,1.98,3.45,4.2,2.1,3.54,4.2,1.95,3.36,3.87
Russia,Premier League,2019/2020,27/10/2019,16:00,Krasnodar,Orenburg,1,1,D,1.58,4.15,5.97,1.62,4.35,6.55,1.56,4.08,5.52
Russia,Premier League,2019/2020,02/11/2019,11:00,Dynamo Moscow,Akhmat Grozny,1,1,D,1.73,3.61,5.48,1.79,3.62,5.9,1.7,3.46,5.27
Russia,Premier League,2019/2020,02/11/2019,11:00,Ufa,Lokomotiv Moscow,1,1,D,4.02,3.11,2.15,4.32,3.3,2.15,3.9,3.06,2.06
Russia,Premier League,2019/2020,02/11/2019,13:30,Sochi,Tambov,1,2,A,1.99,3.36,4.27,2.06,3.48,4.45,1.97,3.24,3.96
Russia,Premier League,2019/2020,02/11/2019,16:00,Zenit,CSKA Moscow,1,1,D,1.64,3.96,5.68,1.66,4.14,6.2,1.6,3.85,5.35
Russia,Premier League,2019/2020,03/11/2019,13:30,Krasnodar,FK Rostov,2,2,D,1.81,3.92,4.39,1.92,3.92,4.5,1.82,3.64,4.1
Russia,Premier League,2019/2020,04/11/2019,11:00,Ural,Orenburg,1,2,A,2.72,3.44,2.65,2.8,3.44,2.9,2.58,3.28,2.67
Russia,Premier League,2019/2020,04/11/2019,13:30,FK Krylya Sovetov Samara,Rubin Kazan,0,0,D,2.32,3.19,3.45,2.42,3.3,3.8,2.26,3.12,3.29
Russia,Premier League,2019/2020,04/11/2019,16:00,Spartak Moscow,Arsenal Tula,0,1,A,1.75,3.59,5.36,1.78,3.65,5.7,1.72,3.52,4.94
Russia,Premier League,2019/2020,08/11/2019,16:30,Akhmat Grozny,Ural,0,0,D,1.88,3.58,4.49,1.95,3.65,4.64,1.86,3.41,4.24
Russia,Premier League,2019/2020,09/11/2019,11:00,Rubin Kazan,Dynamo Moscow,0,1,A,3.31,2.92,2.57,3.35,3.07,2.62,3.14,2.85,2.52
Russia,Premier League,2019/2020,09/11/2019,13:30,FK Rostov,Tambov,1,2,A,1.68,3.64,5.92,1.7,4.1,6.25,1.65,3.69,5.34
Russia,Premier League,2019/2020,09/11/2019,16:00,Spartak Moscow,FK Krylya Sovetov Samara,2,0,H,1.68,3.86,5.49,1.74,3.86,6.6,1.66,3.71,5.12
Russia,Premier League,2019/2020,10/11/2019,08:30,Orenburg,Ufa,0,0,D,2.21,3.09,3.87,2.21,3.26,4.2,2.11,3.05,3.78
Russia,Premier League,2019/2020,10/11/2019,11:00,Arsenal Tula,Zenit,0,1,A,6.83,4.2,1.53,6.83,4.2,1.6,6.09,3.98,1.54
Russia,Premier League,2019/2020,10/11/2019,13:30,Sochi,CSKA Moscow,2,3,A,4.38,3.58,1.9,4.88,3.58,1.92,4.2,3.41,1.87
Russia,Premier League,2019/2020,10/11/2019,16:00,Lokomotiv Moscow,Krasnodar,1,1,D,2.45,3.54,2.9,2.5,3.6,3.26,2.43,3.28,2.87
Russia,Premier League,2019/2020,22/11/2019,16:30,Tambov,Lokomotiv Moscow,2,3,A,4.33,3.13,2,5.77,3.75,2.05,4.18,3.22,1.94
Russia,Premier League,2019/2020,23/11/2019,08:30,Orenburg,Akhmat Grozny,1,2,A,2.11,3.33,3.82,2.16,3.4,4.2,2.08,3.2,3.66
Russia,Premier League,2019/2020,23/11/2019,11:00,Rubin Kazan,Zenit,1,2,A,7.9,4.48,1.45,9.9,4.48,1.48,7.63,4.17,1.44
Russia,Premier League,2019/2020,23/11/2019,13:30,Dynamo Moscow,FK Rostov,2,1,H,2.26,3.16,3.63,2.34,3.3,3.65,2.24,3.07,3.39
Russia,Premier League,2019/2020,24/11/2019,08:30,Ufa,Sochi,1,1,D,2.13,3.11,4.08,2.28,3.15,4.52,2.15,2.95,3.83
Russia,Premier League,2019/2020,24/11/2019,11:00,Ural,Spartak Moscow,0,0,D,3.69,3.57,2.07,3.72,3.7,2.2,3.5,3.37,2.06
Russia,Premier League,2019/2020,24/11/2019,13:30,Arsenal Tula,Krasnodar,1,2,A,3.22,3.4,2.33,3.7,3.42,2.33,3.23,3.27,2.21
Russia,Premier League,2019/2020,24/11/2019,16:00,CSKA Moscow,FK Krylya Sovetov Samara,1,0,H,1.41,4.48,9.02,1.45,4.55,10,1.4,4.29,8.19
Russia,Premier League,2019/2020,30/11/2019,11:00,FK Krylya Sovetov Samara,Ufa,0,1,A,2.73,2.88,3.12,2.75,3.02,3.44,2.62,2.8,3.04
Russia,Premier League,2019/2020,30/11/2019,13:30,FK Rostov,Ural,0,0,D,1.58,4.21,5.95,1.65,4.21,6.9,1.57,3.94,5.66
Russia,Premier League,2019/2020,30/11/2019,16:00,Akhmat Grozny,Rubin Kazan,1,1,D,2.03,3.17,4.42,2.18,3.3,4.46,2.01,3.05,4.1
Russia,Premier League,2019/2020,01/12/2019,13:30,Lokomotiv Moscow,Dynamo Moscow,1,2,A,2.56,3.12,3.09,2.56,3.2,3.4,2.45,3,3.07
Russia,Premier League,2019/2020,01/12/2019,16:00,Zenit,Spartak Moscow,1,0,H,1.48,4.55,6.88,1.55,4.55,8.5,1.47,4.25,6.53
Russia,Premier League,2019/2020,02/12/2019,16:30,CSKA Moscow,Arsenal Tula,0,1,A,1.52,4.07,7.43,1.55,4.2,8.5,1.49,3.96,6.86
Russia,Premier League,2019/2020,02/12/2019,16:30,Krasnodar,Tambov,0,0,D,1.36,5.02,9.16,1.4,5.1,9.8,1.37,4.72,8.12
Russia,Premier League,2019/2020,06/12/2019,16:30,Arsenal Tula,Lokomotiv Moscow,4,0,H,3.46,3.12,2.35,3.68,3.4,2.36,3.33,3.08,2.26
Russia,Premier League,2019/2020,06/12/2019,16:30,Zenit,Dynamo Moscow,3,0,H,1.53,4.18,6.81,1.58,4.3,7.3,1.53,3.96,6.22
Russia,Premier League,2019/2020,07/12/2019,11:00,Tambov,Orenburg,3,0,H,2.9,3.13,2.7,2.96,3.45,2.8,2.79,3.09,2.59
Russia,Premier League,2019/2020,07/12/2019,13:30,Krasnodar,CSKA Moscow,1,1,D,2.38,3.34,3.17,2.44,3.5,3.68,2.31,3.24,3.06
Russia,Premier League,2019/2020,07/12/2019,16:00,Akhmat Grozny,Ufa,0,1,A,2.28,2.9,3.88,2.56,3.19,3.95,2.28,2.83,3.62
Russia,Premier League,2019/2020,08/12/2019,11:00,FK Krylya Sovetov Samara,Ural,2,3,A,2.13,3.36,3.75,2.21,3.38,3.84,2.08,3.23,3.6
Russia,Premier League,2019/2020,08/12/2019,13:30,Sochi,Rubin Kazan,1,1,D,2.49,3.08,3.24,2.54,3.34,3.54,2.39,3.01,3.15
Russia,Premier League,2019/2020,08/12/2019,16:00,Spartak Moscow,FK Rostov,1,4,A,2.16,3.34,3.67,2.34,3.5,3.92,2.13,3.24,3.45
Russia,Premier League,2019/2020,28/02/2020,15:30,FK Krylya Sovetov Samara,Orenburg,1,1,D,2.82,3.16,2.72,2.96,3.2,2.85,2.75,3.04,2.66
Russia,Premier League,2019/2020,29/02/2020,11:00,CSKA Moscow,Ural,1,1,D,1.35,5.01,9.85,1.4,5.15,13.5,1.34,4.66,9.66
Russia,Premier League,2019/2020,29/02/2020,13:30,Dynamo Moscow,Spartak Moscow,0,2,A,2.65,2.94,3.11,2.75,3.09,3.13,2.6,2.91,2.94
Russia,Premier League,2019/2020,29/02/2020,16:00,Akhmat Grozny,FK Rostov,1,1,D,3.02,3.13,2.57,3.17,3.28,2.65,2.89,3.08,2.52
Russia,Premier League,2019/2020,29/02/2020,16:00,Zenit,Lokomotiv Moscow,0,0,D,1.59,3.82,6.7,1.63,4.1,7.6,1.56,3.79,6.23
Russia,Premier League,2019/2020,01/03/2020,11:00,Tambov,Rubin Kazan,0,0,D,3.49,3.05,2.35,3.76,3.09,2.43,3.37,2.95,2.32
Russia,Premier League,2019/2020,01/03/2020,13:30,Krasnodar,Ufa,2,0,H,1.78,3.2,6,1.81,3.49,6.1,1.75,3.25,5.38
Russia,Premier League,2019/2020,01/03/2020,16:00,Sochi,Arsenal Tula,1,2,A,2.31,3.26,3.33,2.46,3.26,3.56,2.36,3.07,3.14
Russia,Premier League,2019/2020,07/03/2020,11:00,Orenburg,Arsenal Tula,2,0,H,2.29,3.26,3.37,2.42,3.45,3.5,2.25,3.16,3.25
Russia,Premier League,2019/2020,07/03/2020,13:30,Dynamo Moscow,Tambov,1,0,H,1.63,3.91,5.78,1.8,3.97,6.6,1.64,3.68,5.46
Russia,Premier League,2019/2020,08/03/2020,11:00,Rubin Kazan,FK Krylya Sovetov Samara,0,1,A,2.09,3.16,4.07,2.13,3.2,4.38,2.06,3.09,3.89
Russia,Premier League,2019/2020,08/03/2020,13:30,Sochi,Ural,2,0,H,2.22,3.25,3.55,2.22,3.35,4,2.11,3.21,3.54
Russia,Premier League,2019/2020,08/03/2020,16:00,Lokomotiv Moscow,Akhmat Grozny,1,0,H,1.66,3.62,6.14,1.69,3.8,7.02,1.64,3.51,5.88
Russia,Premier League,2019/2020,09/03/2020,11:00,FK Rostov,CSKA Moscow,3,2,H,2.94,3,2.72,2.98,3.12,2.86,2.81,2.99,2.64
Russia,Premier League,2019/2020,09/03/2020,13:30,Spartak Moscow,Krasnodar,0,1,A,2.26,3.28,3.41,2.35,3.39,3.45,2.24,3.22,3.23
Russia,Premier League,2019/2020,09/03/2020,16:00,Zenit,Ufa,0,0,D,1.33,4.86,12.12,1.38,5,13,1.32,4.63,10.8
Russia,Premier League,2019/2020,11/03/2020,16:30,Sochi,Orenburg,5,1,H,2.29,3.31,3.32,2.31,3.4,3.76,2.22,3.24,3.24
Russia,Premier League,2019/2020,13/03/2020,16:30,Akhmat Grozny,Dynamo Moscow,2,3,A,3.19,2.92,2.61,3.5,3.1,2.61,3.13,2.93,2.45
Russia,Premier League,2019/2020,14/03/2020,11:00,Orenburg,Spartak Moscow,1,3,A,3.03,3.24,2.5,3.1,3.37,2.63,2.82,3.14,2.52
Russia,Premier League,2019/2020,14/03/2020,13:30,Zenit,Ural,7,1,H,1.18,7.36,15.36,1.25,7.5,23,1.18,6.75,14.93
Russia,Premier League,2019/2020,14/03/2020,16:00,Arsenal Tula,Rubin Kazan,0,1,A,2.22,3.19,3.62,2.38,3.19,3.83,2.23,3.01,3.48
Russia,Premier League,2019/2020,15/03/2020,11:00,Sochi,Krasnodar,2,0,H,3.33,3.44,2.23,3.6,3.78,2.36,3.17,3.32,2.23
Russia,Premier League,2019/2020,15/03/2020,13:30,CSKA Moscow,Ufa,0,0,D,1.56,3.9,7.02,1.64,3.9,7.2,1.57,3.67,6.38
Russia,Premier League,2019/2020,15/03/2020,16:00,FK Rostov,Lokomotiv Moscow,1,3,A,2.43,3.32,3.05,2.59,3.45,3.2,2.4,3.21,2.95
Russia,Premier League,2019/2020,16/03/2020,16:30,Tambov,FK Krylya Sovetov Samara,3,0,H,2.71,2.99,2.97,2.95,3.15,3.15,2.67,2.92,2.87
Russia,Premier League,2019/2020,19/06/2020,16:00,FK Krylya Sovetov Samara,Akhmat Grozny,2,4,A,2.77,2.9,3.09,2.92,3.2,3.15,2.69,2.84,2.94
Russia,Premier League,2019/2020,19/06/2020,18:00,Sochi,FK Rostov,10,1,H,,,,1.08,29,29,1.07,20.63,21.46
Russia,Premier League,2019/2020,20/06/2020,12:00,Ural,Rubin Kazan,1,2,A,2.91,3.07,2.78,3,3.34,2.83,2.77,3.05,2.66
Russia,Premier League,2019/2020,20/06/2020,14:30,Arsenal Tula,Spartak Moscow,2,3,A,3.64,3.19,2.26,3.8,3.36,2.32,3.41,3.15,2.21
Russia,Premier League,2019/2020,20/06/2020,17:00,CSKA Moscow,Zenit,0,4,A,3.98,3.1,2.19,4.16,3.44,2.3,3.6,3.17,2.13
Russia,Premier League,2019/2020,21/06/2020,13:00,Ufa,Tambov,2,1,H,2.36,2.95,3.57,2.4,3.18,3.75,2.29,2.93,3.46
Russia,Premier League,2019/2020,21/06/2020,15:30,Lokomotiv Moscow,Orenburg,1,0,H,1.55,3.91,6.74,1.62,4.2,8.1,1.54,3.88,6.3
Russia,Premier League,2019/2020,26/06/2020,16:00,Akhmat Grozny,Sochi,1,1,D,3.06,2.96,2.54,3.23,3.35,2.64,2.93,3.13,2.49
Russia,Premier League,2019/2020,26/06/2020,18:30,Zenit,FK Krylya Sovetov Samara,2,1,H,1.11,9.04,21.29,1.16,10.75,25,1.11,8.92,20.57
Russia,Premier League,2019/2020,27/06/2020,12:00,Orenburg,Krasnodar,0,3,A,,,,6.5,4,1.71,5.98,3.88,1.59
Russia,Premier League,2019/2020,27/06/2020,14:30,Spartak Moscow,Ufa,0,0,D,1.48,4.32,6.32,2.11,3.42,4.78,1.96,3.17,4.05
Russia,Premier League,2019/2020,27/06/2020,15:30,Rubin Kazan,Lokomotiv Moscow,0,2,A,3.97,2.98,2.13,4.2,3.3,2.2,3.83,3.07,2.09
Russia,Premier League,2019/2020,27/06/2020,17:00,Dynamo Moscow,CSKA Moscow,0,0,D,3.84,3.11,2.1,4.04,3.31,2.32,3.74,3.13,2.1
Russia,Premier League,2019/2020,27/06/2020,18:00,FK Rostov,Arsenal Tula,2,1,H,,,,2.56,3.6,3.3,2.34,3.32,3.01
Russia,Premier League,2019/2020,28/06/2020,14:30,Ural,Tambov,2,1,H,2.37,3.21,3.08,2.46,3.48,3.4,2.36,3.16,3.08
Russia,Premier League,2019/2020,30/06/2020,16:00,Lokomotiv Moscow,FK Krylya Sovetov Samara,1,1,D,1.46,4.36,7.31,1.5,5.05,8.37,1.44,4.41,6.9
Russia,Premier League,2019/2020,30/06/2020,18:30,CSKA Moscow,Spartak Moscow,2,0,H,2.33,3.37,3.26,2.47,3.48,3.32,2.3,3.25,3.12
Russia,Premier League,2019/2020,01/07/2020,13:00,Orenburg,Ural,0,3,A,,,,,,,,,
Russia,Premier League,2019/2020,01/07/2020,13:00,Ufa,Rubin Kazan,0,0,D,2.66,2.79,3.22,2.75,3.01,3.35,2.58,2.8,3.12
Russia,Premier League,2019/2020,01/07/2020,15:30,Arsenal Tula,Akhmat Grozny,1,3,A,2.47,3.1,3.01,2.7,3.26,3.18,2.47,3.1,2.95
Russia,Premier League,2019/2020,01/07/2020,15:30,Tambov,Zenit,1,2,A,9.47,6.15,1.25,11.75,6.45,1.31,9.84,5.74,1.27
Russia,Premier League,2019/2020,01/07/2020,18:00,FK Rostov,Krasnodar,1,1,D,,,,3.4,3.65,2.4,3.07,3.39,2.23
Russia,Premier League,2019/2020,01/07/2020,18:00,Sochi,Dynamo Moscow,1,1,D,2.44,3.07,3.22,2.55,3.35,3.32,2.42,3.09,3.05
Russia,Premier League,2019/2020,04/07/2020,14:30,Dynamo Moscow,Arsenal Tula,0,1,A,2.16,3.24,3.73,2.2,3.54,4.1,2.11,3.16,3.61
Russia,Premier League,2019/2020,04/07/2020,16:30,FK Krylya Sovetov Samara,FK Rostov,0,0,D,,,,2.77,3.4,2.88,2.58,3.23,2.67
Russia,Premier League,2019/2020,04/07/2020,16:30,Spartak Moscow,Tambov,2,3,A,1.65,3.86,5.44,1.7,4.2,6.2,1.63,3.81,5.26
Russia,Premier League,2019/2020,04/07/2020,18:30,Akhmat Grozny,CSKA Moscow,0,4,A,3.44,3.14,2.29,3.65,3.45,2.42,3.28,3.14,2.26
Russia,Premier League,2019/2020,04/07/2020,18:30,Lokomotiv Moscow,Sochi,0,0,D,2.05,3.53,3.66,2.05,3.7,4.15,1.97,3.49,3.71
Russia,Premier League,2019/2020,05/07/2020,14:30,Ufa,Ural,1,1,D,2.61,2.78,3.3,2.75,3,3.46,2.55,2.83,3.13
Russia,Premier League,2019/2020,05/07/2020,16:30,Rubin Kazan,Orenburg,1,0,H,,,,1.35,6.15,14.25,1.3,5.42,9.9
Russia,Premier League,2019/2020,05/07/2020,18:30,Krasnodar,Zenit,2,4,A,3.57,3.51,2.08,3.7,3.61,2.25,3.4,3.42,2.09
Russia,Premier League,2019/2020,07/07/2020,16:30,Tambov,Akhmat Grozny,1,2,A,3.04,3.15,2.5,3.3,3.3,2.6,2.97,3.1,2.47
Russia,Premier League,2019/2020,07/07/2020,18:30,Arsenal Tula,FK Krylya Sovetov Samara,2,4,A,2.23,3.21,3.51,2.38,3.44,3.62,2.2,3.19,3.38
Russia,Premier League,2019/2020,08/07/2020,16:00,Orenburg,CSKA Moscow,0,4,A,6.33,4.49,1.46,9,5.3,1.48,6.66,4.56,1.44
Russia,Premier League,2019/2020,08/07/2020,16:00,Zenit,Sochi,2,1,H,1.68,4.37,4.48,1.72,4.6,5,1.67,4.21,4.41
Russia,Premier League,2019/2020,08/07/2020,18:30,FK Rostov,Ufa,1,2,A,,,,2.09,3.43,4.81,1.96,3.24,4.03
Russia,Premier League,2019/2020,08/07/2020,18:30,Spartak Moscow,Lokomotiv Moscow,1,1,D,2.7,3.23,2.73,2.8,3.46,2.81,2.65,3.18,2.68
Russia,Premier League,2019/2020,09/07/2020,15:00,Ural,Dynamo Moscow,2,1,H,3.49,3.02,2.27,3.96,3.32,2.49,3.28,3.09,2.28
Russia,Premier League,2019/2020,09/07/2020,18:30,Rubin Kazan,Krasnodar,1,0,H,3.31,3.32,2.26,3.75,3.56,2.28,3.32,3.26,2.18
Russia,Premier League,2019/2020,11/07/2020,14:00,Arsenal Tula,Tambov,2,1,H,2.38,3.13,3.26,2.46,3.4,3.57,2.32,3.14,3.12
Russia,Premier League,2019/2020,11/07/2020,16:30,Akhmat Grozny,Zenit,1,1,D,3.14,3.45,2.28,3.2,3.58,2.5,2.95,3.38,2.3
Russia,Premier League,2019/2020,11/07/2020,18:30,Sochi,Spartak Moscow,1,0,H,2.96,3.41,2.41,3.12,3.64,2.56,2.86,3.3,2.41
Russia,Premier League,2019/2020,12/07/2020,14:30,Lokomotiv Moscow,Ufa,1,1,D,1.52,3.77,8,1.62,3.92,8.03,1.55,3.6,6.98
Russia,Premier League,2019/2020,12/07/2020,16:30,CSKA Moscow,Rubin Kazan,1,1,D,1.36,4.66,9.99,1.42,5.22,11.25,1.35,4.6,9.32
Russia,Premier League,2019/2020,12/07/2020,16:30,Dynamo Moscow,FK Krylya Sovetov Samara,2,0,H,2.11,3.05,3.88,2.23,3.25,4.13,2.11,3.08,3.71
Russia,Premier League,2019/2020,12/07/2020,16:30,Orenburg,FK Rostov,0,0,D,3.86,3.67,1.9,4.55,4,1.91,3.91,3.71,1.85
Russia,Premier League,2019/2020,12/07/2020,18:30,Krasnodar,Ural,3,0,H,1.35,4.98,7.95,1.45,5.65,9.9,1.37,4.8,7.79
Russia,Premier League,2019/2020,15/07/2020,14:00,Ural,Arsenal Tula,1,3,A,2.25,3.3,3.36,2.62,3.48,3.61,2.26,3.2,3.23
Russia,Premier League,2019/2020,15/07/2020,16:00,FK Krylya Sovetov Samara,Krasnodar,0,0,D,4.81,3.84,1.73,5.46,4.2,1.76,4.72,3.79,1.7
Russia,Premier League,2019/2020,15/07/2020,16:00,Spartak Moscow,Akhmat Grozny,3,0,H,2.12,3.23,3.77,2.2,3.5,4.05,2.1,3.3,3.49
Russia,Premier League,2019/2020,15/07/2020,18:30,Zenit,Orenburg,4,1,H,1.23,6.23,10.58,1.28,7.5,13.25,1.24,6.16,10.27
Russia,Premier League,2019/2020,16/07/2020,16:00,Rubin Kazan,FK Rostov,0,0,D,2.92,3,2.71,2.97,3.24,2.82,2.79,2.99,2.68
Russia,Premier League,2019/2020,16/07/2020,16:00,Ufa,Dynamo Moscow,0,1,A,3.89,2.82,2.12,5.3,3.3,2.19,4.07,3,2.06
Russia,Premier League,2019/2020,16/07/2020,18:30,Lokomotiv Moscow,CSKA Moscow,2,1,H,3.1,3.16,2.46,3.24,3.35,2.56,2.98,3.16,2.42
Russia,Premier League,2019/2020,16/07/2020,18:30,Tambov,Sochi,3,0,H,,,,2.55,3.4,2.88,2.44,3.32,2.82
Russia,Premier League,2019/2020,19/07/2020,18:30,Krasnodar,Dynamo Moscow,0,2,A,1.57,4.06,6.08,1.65,4.25,7,1.58,3.84,5.75
Russia,Premier League,2019/2020,22/07/2020,17:00,CSKA Moscow,Tambov,2,0,H,1.25,5.92,12.39,1.33,6.45,12.75,1.29,5.56,9.35
Russia,Premier League,2019/2020,22/07/2020,17:00,Dynamo Moscow,Orenburg,0,1,A,1.6,3.82,5.7,1.68,4.1,6.15,1.61,3.78,5.57
Russia,Premier League,2019/2020,22/07/2020,17:00,FK Krylya Sovetov Samara,Sochi,3,0,H,,,,,,,,,
Russia,Premier League,2019/2020,22/07/2020,17:00,FK Rostov,Zenit,1,2,A,2.14,3.64,3.28,2.24,3.95,3.34,2.11,3.59,3.19
Russia,Premier League,2019/2020,22/07/2020,17:00,Krasnodar,Akhmat Grozny,4,0,H,1.33,5.05,8.44,1.41,5.3,9.6,1.36,4.97,7.82
Russia,Premier League,2019/2020,22/07/2020,17:00,Rubin Kazan,Spartak Moscow,1,2,A,3.18,3.22,2.31,3.46,3.3,2.48,3.12,3.2,2.3
Russia,Premier League,2019/2020,22/07/2020,17:00,Ufa,Arsenal Tula,0,0,D,2.7,2.87,2.94,2.85,3.06,3.13,2.64,2.89,2.92
Russia,Premier League,2019/2020,22/07/2020,17:00,Ural,Lokomotiv Moscow,0,1,A,2.98,3.51,2.28,3.48,3.85,2.32,3.04,3.52,2.2
Russia,Premier League,2020/2021,08/08/2020,14:00,Khimki,CSKA Moscow,0,2,A,4.69,3.48,1.79,6.15,3.7,1.84,4.63,3.5,1.78
Russia,Premier League,2020/2021,08/08/2020,16:30,Tambov,FK Rostov,0,1,A,3.7,3.16,2.12,4.06,3.65,2.17,3.67,3.24,2.07
Russia,Premier League,2020/2021,09/08/2020,15:00,Ufa,Krasnodar,0,3,A,4.13,3.15,2.01,4.51,3.46,2.07,4.04,3.15,2
Russia,Premier League,2020/2021,09/08/2020,17:00,Arsenal Tula,Akhmat Grozny,0,0,D,2.53,2.96,3.08,2.73,3.38,3.14,2.48,3.07,2.96
Russia,Premier League,2020/2021,09/08/2020,18:00,Spartak Moscow,Sochi,2,2,D,1.61,3.93,5.39,1.73,4.35,6,1.62,3.82,5.36
Russia,Premier League,2020/2021,10/08/2020,15:00,Ural,Dynamo Moscow,0,2,A,3.54,3.13,2.19,3.84,3.41,2.27,3.5,3.17,2.16
Russia,Premier League,2020/2021,11/08/2020,16:00,R. Volgograd,Zenit,0,2,A,8.74,4.9,1.35,11.5,5.7,1.36,8.98,5.07,1.32
Russia,Premier League,2020/2021,11/08/2020,18:00,Rubin Kazan,Lokomotiv Moscow,0,2,A,3.21,3.16,2.32,3.41,3.26,2.6,3.1,3.11,2.39
Russia,Premier League,2020/2021,14/08/2020,16:00,Arsenal Tula,Ufa,2,3,A,2.34,2.9,3.5,2.5,2.98,3.81,2.35,2.86,3.46
Russia,Premier League,2020/2021,14/08/2020,17:00,Sochi,Khimki,1,1,D,1.92,3.36,4.2,2.03,3.58,4.5,1.92,3.34,4.09
Russia,Premier League,2020/2021,14/08/2020,18:00,Spartak Moscow,Akhmat Grozny,2,0,H,1.69,3.65,5.09,1.75,4.1,6.4,1.66,3.77,5.14
Russia,Premier League,2020/2021,15/08/2020,13:30,Dynamo Moscow,R. Volgograd,0,0,D,1.68,3.43,5.74,1.75,3.58,6.95,1.69,3.37,5.7
Russia,Premier League,2020/2021,15/08/2020,13:30,Rubin Kazan,Ural,1,1,D,1.81,3.48,4.61,1.84,3.84,5.9,1.75,3.49,4.91
Russia,Premier League,2020/2021,15/08/2020,16:00,CSKA Moscow,Tambov,2,1,H,1.42,4.16,8.47,1.52,4.65,9.7,1.45,4.15,7.5
Russia,Premier League,2020/2021,15/08/2020,17:00,Lokomotiv Moscow,Krasnodar,1,0,H,2.96,3.2,2.45,3.2,3.56,2.55,2.96,3.23,2.4
Russia,Premier League,2020/2021,15/08/2020,18:00,FK Rostov,Zenit,0,2,A,4.16,3.5,1.88,4.77,3.84,1.94,4.21,3.55,1.84
Russia,Premier League,2020/2021,18/08/2020,16:00,Sochi,Rubin Kazan,3,2,H,2.45,3.04,3.1,2.52,3.32,3.28,2.42,3.04,3.1
Russia,Premier League,2020/2021,18/08/2020,17:00,Tambov,Khimki,1,0,H,2.77,3.01,2.68,2.95,3.2,2.84,2.78,3.03,2.67
Russia,Premier League,2020/2021,18/08/2020,18:00,Krasnodar,Arsenal Tula,2,0,H,1.43,4.42,7.17,1.45,5.15,8.5,1.42,4.58,7.06
Russia,Premier League,2020/2021,19/08/2020,14:00,Ufa,Spartak Moscow,1,1,D,4,3.17,2.03,4.41,3.35,2.12,3.99,3.12,2.03
Russia,Premier League,2020/2021,19/08/2020,14:00,Ural,Lokomotiv Moscow,1,1,D,4.79,3.49,1.77,5.49,3.83,1.83,4.64,3.52,1.77
Russia,Premier League,2020/2021,19/08/2020,16:00,Akhmat Grozny,R. Volgograd,3,1,H,2.28,2.92,3.79,2.41,3.12,4.21,2.23,2.9,3.69
Russia,Premier League,2020/2021,19/08/2020,17:00,Dynamo Moscow,FK Rostov,2,0,H,2.19,3,3.89,2.24,3.38,4.1,2.11,3.07,3.81
Russia,Premier League,2020/2021,19/08/2020,18:00,Zenit,CSKA Moscow,2,1,H,1.82,3.78,4.31,1.9,3.92,5.23,1.81,3.65,4.26
Russia,Premier League,2020/2021,22/08/2020,12:00,Ural,Krasnodar,1,0,H,5.62,4.03,1.61,6.4,4.47,1.64,5.44,3.98,1.59
Russia,Premier League,2020/2021,22/08/2020,14:00,Khimki,Akhmat Grozny,1,2,A,2.64,3.11,2.89,2.81,3.26,3.02,2.58,3.07,2.84
Russia,Premier League,2020/2021,22/08/2020,15:30,Arsenal Tula,Dynamo Moscow,2,0,H,4.51,3.27,1.93,4.92,3.38,2,4.36,3.22,1.91
Russia,Premier League,2020/2021,22/08/2020,16:00,Zenit,Tambov,4,1,H,1.15,8.19,18.87,1.25,8.19,19.5,1.2,6.64,13.24
Russia,Premier League,2020/2021,22/08/2020,18:00,CSKA Moscow,Rubin Kazan,1,2,A,1.72,3.66,5.17,1.78,3.98,5.77,1.71,3.59,4.94
Russia,Premier League,2020/2021,22/08/2020,18:00,R. Volgograd,Sochi,1,2,A,3.6,3.03,2.28,3.72,3.3,2.35,3.43,3.04,2.25
Russia,Premier League,2020/2021,23/08/2020,14:30,Ufa,FK Rostov,0,1,A,2.95,2.85,2.8,3.5,2.99,2.89,2.98,2.82,2.67
Russia,Premier League,2020/2021,23/08/2020,17:00,Spartak Moscow,Lokomotiv Moscow,2,1,H,2.53,3.1,3.05,2.68,3.3,3.16,2.51,3.09,2.91
Russia,Premier League,2020/2021,25/08/2020,16:30,Tambov,Sochi,0,1,A,3.84,3.26,2.07,4.12,3.48,2.15,3.73,3.23,2.06
Russia,Premier League,2020/2021,25/08/2020,18:30,Arsenal Tula,Khimki,1,1,D,1.87,3.41,4.5,2,3.71,5,1.87,3.39,4.32
Russia,Premier League,2020/2021,26/08/2020,16:30,Lokomotiv Moscow,Akhmat Grozny,2,3,A,1.88,3.58,4.15,1.96,3.6,4.77,1.88,3.42,4.19
Russia,Premier League,2020/2021,26/08/2020,16:30,R. Volgograd,Spartak Moscow,0,1,A,5.97,3.82,1.61,6.95,4.14,1.64,5.95,3.83,1.57
Russia,Premier League,2020/2021,26/08/2020,16:30,Rubin Kazan,Ufa,3,0,H,1.93,3.15,4.7,2.01,3.35,5,1.91,3.13,4.59
Russia,Premier League,2020/2021,26/08/2020,18:30,FK Rostov,Ural,1,0,H,1.67,3.7,5.51,1.7,3.9,6.35,1.65,3.67,5.42
Russia,Premier League,2020/2021,26/08/2020,18:30,Krasnodar,CSKA Moscow,1,1,D,2.25,3.43,3.19,2.52,3.61,3.25,2.25,3.38,3.09
Russia,Premier League,2020/2021,26/08/2020,18:45,Dynamo Moscow,Zenit,1,0,H,4.39,3.54,1.85,5.01,3.74,1.91,4.36,3.5,1.83
Russia,Premier League,2020/2021,29/08/2020,16:00,Spartak Moscow,Arsenal Tula,2,1,H,1.58,3.89,6.15,1.62,4.2,7.4,1.57,3.9,5.92
Russia,Premier League,2020/2021,29/08/2020,18:00,Khimki,R. Volgograd,1,1,D,1.96,3.25,4.31,2.15,3.38,4.6,1.97,3.21,4.12
Russia,Premier League,2020/2021,30/08/2020,12:00,Ufa,Dynamo Moscow,1,1,D,4.4,2.93,2.07,4.9,3.1,2.17,4.17,2.93,2.07
Russia,Premier League,2020/2021,30/08/2020,14:00,Lokomotiv Moscow,Zenit,0,0,D,5.17,3.84,1.67,5.55,4.2,1.73,5.03,3.87,1.66
Russia,Premier League,2020/2021,30/08/2020,16:00,Akhmat Grozny,CSKA Moscow,0,3,A,3.97,3.44,1.97,4.2,3.66,2.04,3.83,3.42,1.96
Russia,Premier League,2020/2021,30/08/2020,16:00,Rubin Kazan,Tambov,2,2,D,1.66,3.75,5.46,1.73,3.88,6.4,1.66,3.6,5.41
Russia,Premier League,2020/2021,30/08/2020,18:00,Krasnodar,FK Rostov,1,1,D,1.75,3.57,5.03,1.94,3.72,5.03,1.86,3.47,4.21
Russia,Premier League,2020/2021,30/08/2020,18:00,Sochi,Ural,0,0,D,1.64,3.92,5.38,1.7,4,6.25,1.63,3.78,5.37
Russia,Premier League,2020/2021,12/09/2020,11:45,Tambov,Ufa,2,0,H,2.7,2.8,3.21,2.81,3.03,3.3,2.64,2.78,3.05
Russia,Premier League,2020/2021,12/09/2020,14:30,Ural,Khimki,3,1,H,2.36,3.15,3.42,2.5,3.5,3.64,2.31,3.07,3.26
Russia,Premier League,2020/2021,12/09/2020,17:00,Akhmat Grozny,Sochi,0,1,A,2.5,3.28,3.05,2.6,3.46,3.13,2.46,3.17,2.92
Russia,Premier League,2020/2021,13/09/2020,14:30,Dynamo Moscow,Rubin Kazan,0,1,A,1.96,3.27,4.57,1.99,3.48,4.8,1.88,3.26,4.41
Russia,Premier League,2020/2021,13/09/2020,17:00,CSKA Moscow,Spartak Moscow,3,1,H,2.39,3.3,3.21,2.54,3.36,3.22,2.39,3.18,3.01
Russia,Premier League,2020/2021,13/09/2020,17:00,R. Volgograd,Krasnodar,0,3,A,10.7,5.37,1.32,15,5.37,1.37,9.91,4.92,1.31
Russia,Premier League,2020/2021,14/09/2020,16:30,Zenit,Arsenal Tula,3,1,H,1.28,6.07,10.95,1.31,6.6,13,1.27,5.68,10
Russia,Premier League,2020/2021,14/09/2020,18:30,FK Rostov,Lokomotiv Moscow,0,0,D,2.42,3.16,3.29,2.58,3.28,3.36,2.38,3.1,3.1
Russia,Premier League,2020/2021,18/09/2020,18:00,Krasnodar,Khimki,7,2,H,1.36,5.22,8.9,1.4,5.45,9.68,1.36,4.93,8.09
Russia,Premier League,2020/2021,19/09/2020,17:00,FK Rostov,R. Volgograd,3,0,H,,,,1.4,5.5,8.75,1.34,5.07,7.46
Russia,Premier League,2020/2021,19/09/2020,14:30,Ural,Zenit,1,1,D,8.39,5.64,1.35,9.8,5.7,1.38,8.28,5.26,1.33
Russia,Premier League,2020/2021,20/09/2020,12:00,Arsenal Tula,Sochi,3,2,H,2.83,3.1,2.8,2.93,3.18,2.88,2.75,3.02,2.71
Russia,Premier League,2020/2021,20/09/2020,12:00,Ufa,CSKA Moscow,0,1,A,4.97,3.47,1.83,6,3.68,1.88,4.83,3.34,1.8
Russia,Premier League,2020/2021,20/09/2020,14:30,Rubin Kazan,Spartak Moscow,0,2,A,3.35,3.36,2.29,3.92,3.52,2.32,3.31,3.29,2.19
Russia,Premier League,2020/2021,20/09/2020,17:00,Lokomotiv Moscow,Tambov,1,0,H,1.52,4.06,7.58,1.58,4.2,7.8,1.52,3.94,6.63
Russia,Premier League,2020/2021,21/09/2020,17:00,Dynamo Moscow,Akhmat Grozny,1,0,H,2.18,3.25,3.75,2.3,3.42,3.96,2.14,3.19,3.56
Russia,Premier League,2020/2021,26/09/2020,12:00,Tambov,Spartak Moscow,0,2,A,7.52,4.19,1.5,7.65,4.26,1.58,6.55,3.99,1.51
Russia,Premier League,2020/2021,26/09/2020,14:30,Zenit,Ufa,6,0,H,1.18,7.07,20.66,1.22,7.4,21.32,1.18,6.43,15.77
Russia,Premier League,2020/2021,26/09/2020,18:00,Sochi,Krasnodar,1,1,D,3.53,3.57,2.13,3.74,3.8,2.17,3.37,3.47,2.08
Russia,Premier League,2020/2021,27/09/2020,12:00,Arsenal Tula,FK Rostov,2,3,A,3.18,3.02,2.58,3.22,3.1,2.67,3.06,2.93,2.51
Russia,Premier League,2020/2021,27/09/2020,14:30,Akhmat Grozny,Ural,2,0,H,1.88,3.54,4.52,1.98,3.68,4.88,1.86,3.43,4.24
Russia,Premier League,2020/2021,27/09/2020,17:00,CSKA Moscow,Lokomotiv Moscow,0,1,A,2.02,3.56,3.86,2.09,3.68,4.08,1.98,3.46,3.69
Russia,Premier League,2020/2021,27/09/2020,17:00,R. Volgograd,Rubin Kazan,1,3,A,7.6,4.26,1.49,7.9,4.4,1.5,7.1,4.12,1.46
Russia,Premier League,2020/2021,28/09/2020,17:00,Khimki,Dynamo Moscow,1,0,H,5.49,3.88,1.68,5.75,3.88,1.8,5.2,3.7,1.66
Russia,Premier League,2020/2021,03/10/2020,12:00,Ufa,R. Volgograd,0,0,D,1.82,3.28,5.48,1.87,3.4,5.74,1.79,3.22,5.13
Russia,Premier League,2020/2021,03/10/2020,14:30,Tambov,Arsenal Tula,1,1,D,3.32,3.04,2.48,3.32,3.25,2.63,3.09,3.01,2.44
Russia,Premier League,2020/2021,03/10/2020,14:30,Ural,CSKA Moscow,0,2,A,5.61,4.08,1.63,6.55,4.11,1.68,5.46,3.85,1.61
Russia,Premier League,2020/2021,03/10/2020,17:00,Spartak Moscow,Zenit,1,1,D,3.7,3.5,2.09,3.91,3.66,2.15,3.5,3.42,2.06
Russia,Premier League,2020/2021,04/10/2020,12:00,Lokomotiv Moscow,Khimki,2,1,H,1.57,4,6.66,1.63,4.31,6.7,1.56,3.92,6.01
Russia,Premier League,2020/2021,04/10/2020,14:30,Rubin Kazan,Akhmat Grozny,1,1,D,1.93,3.46,4.4,1.98,3.52,4.55,1.9,3.37,4.1
Russia,Premier League,2020/2021,04/10/2020,14:30,Sochi,FK Rostov,4,2,H,2.68,2.97,3.09,2.68,3.24,3.25,2.5,2.98,3.03
Russia,Premier League,2020/2021,04/10/2020,18:00,Dynamo Moscow,Krasnodar,2,0,H,3.16,3.09,2.54,3.2,3.39,2.57,2.99,3.11,2.45
Russia,Premier League,2020/2021,17/10/2020,12:00,Zenit,Sochi,3,1,H,1.45,4.65,7.42,1.47,5.14,9.3,1.42,4.57,7.09
Russia,Premier League,2020/2021,17/10/2020,14:30,Krasnodar,Rubin Kazan,3,1,H,1.94,3.66,4.03,2.14,3.75,4.35,1.91,3.53,3.87
Russia,Premier League,2020/2021,17/10/2020,14:30,Lokomotiv Moscow,Ufa,1,0,H,1.65,3.65,6.31,1.74,3.8,6.86,1.63,3.58,5.83
Russia,Premier League,2020/2021,17/10/2020,17:00,Khimki,Spartak Moscow,2,3,A,6.56,4.39,1.52,6.81,4.33,1.75,5.27,3.88,1.63
Russia,Premier League,2020/2021,18/10/2020,12:00,Arsenal Tula,Ural,1,0,H,2.14,3.16,3.99,2.2,3.3,4.2,2.09,3.1,3.79
Russia,Premier League,2020/2021,18/10/2020,12:00,R. Volgograd,Tambov,0,2,A,3.16,2.99,2.62,3.46,3.05,2.89,3.05,2.87,2.58
Russia,Premier League,2020/2021,18/10/2020,14:30,CSKA Moscow,Dynamo Moscow,3,1,H,2.32,3.31,3.32,2.32,3.62,3.88,2.17,3.27,3.37
Russia,Premier League,2020/2021,18/10/2020,17:00,FK Rostov,Akhmat Grozny,3,0,H,2.45,3.05,3.36,2.6,3.17,3.57,2.38,3.02,3.2
Russia,Premier League,2020/2021,24/10/2020,12:00,Dynamo Moscow,Sochi,3,1,H,2.07,3.25,4.09,2.12,3.45,4.29,2.03,3.2,3.87
Russia,Premier League,2020/2021,24/10/2020,14:30,Zenit,Rubin Kazan,1,2,A,1.53,4.26,6.66,1.57,4.81,7.33,1.49,4.29,6.31
Russia,Premier League,2020/2021,24/10/2020,17:00,Krasnodar,Spartak Moscow,1,3,A,2.68,3.7,2.57,2.82,3.71,2.71,2.66,3.46,2.51
Russia,Premier League,2020/2021,24/10/2020,17:00,Lokomotiv Moscow,R. Volgograd,1,2,A,1.45,4.26,8.75,1.52,4.4,9.3,1.46,4.04,7.51
Russia,Premier League,2020/2021,25/10/2020,11:00,Ural,Tambov,0,0,D,2.14,3.1,4.09,2.22,3.26,4.09,2.12,3.02,3.81
Russia,Premier League,2020/2021,25/10/2020,13:30,FK Rostov,Khimki,0,2,A,1.83,3.6,4.71,1.89,3.74,4.98,1.79,3.5,4.52
Russia,Premier League,2020/2021,25/10/2020,16:00,Akhmat Grozny,Ufa,3,1,H,1.73,3.52,5.75,1.79,3.82,6.02,1.72,3.43,5.27
Russia,Premier League,2020/2021,26/10/2020,16:00,CSKA Moscow,Arsenal Tula,5,1,H,1.44,4.75,7.51,1.49,4.75,9,1.43,4.41,7.24
Russia,Premier League,2020/2021,31/10/2020,11:00,Rubin Kazan,Arsenal Tula,3,1,H,1.65,3.72,6.16,1.7,3.96,6.45,1.63,3.67,5.66
Russia,Premier League,2020/2021,31/10/2020,13:30,Akhmat Grozny,Krasnodar,2,0,H,2.5,3.53,2.86,2.6,3.58,3,2.43,3.41,2.8
Russia,Premier League,2020/2021,31/10/2020,13:30,Spartak Moscow,FK Rostov,0,1,A,1.88,3.45,4.7,1.88,3.6,5.51,1.8,3.43,4.68
Russia,Premier League,2020/2021,31/10/2020,16:00,Sochi,Lokomotiv Moscow,2,1,H,2.51,3.09,3.21,2.63,3.3,3.26,2.43,3.07,3.06
Russia,Premier League,2020/2021,01/11/2020,09:00,Ufa,Ural,1,2,A,2.34,2.92,3.78,2.44,3.08,3.93,2.27,2.89,3.6
Russia,Premier League,2020/2021,01/11/2020,11:00,Khimki,Zenit,0,2,A,5.38,4.19,1.6,5.85,4.45,1.65,5.23,4.07,1.6
Russia,Premier League,2020/2021,01/11/2020,13:30,R. Volgograd,CSKA Moscow,0,1,A,8.36,5.14,1.38,11.5,5.25,1.41,8.38,4.74,1.37
Russia,Premier League,2020/2021,01/11/2020,16:00,Tambov,Dynamo Moscow,1,2,A,5.59,3.43,1.77,5.89,3.5,1.89,5.1,3.31,1.77
Russia,Premier League,2020/2021,06/11/2020,16:00,Sochi,Ufa,1,1,D,1.75,3.44,5.77,1.78,3.62,6.49,1.71,3.35,5.44
Russia,Premier League,2020/2021,07/11/2020,11:00,Ural,Spartak Moscow,2,2,D,4.69,3.49,1.87,5.49,3.57,1.89,4.56,3.34,1.83
Russia,Premier League,2020/2021,07/11/2020,13:30,Arsenal Tula,R. Volgograd,1,1,D,1.94,3.42,4.37,1.94,3.61,4.79,1.86,3.36,4.42
Russia,Premier League,2020/2021,07/11/2020,16:00,Tambov,Akhmat Grozny,0,1,A,4.74,3.69,1.81,5.15,3.87,1.83,4.64,3.5,1.78
Russia,Premier League,2020/2021,08/11/2020,11:00,Khimki,Rubin Kazan,2,0,H,3.78,3.54,2.05,3.78,3.67,2.15,3.52,3.45,2.04
Russia,Premier League,2020/2021,08/11/2020,13:30,CSKA Moscow,FK Rostov,2,0,H,1.51,4.36,6.81,1.56,4.49,7.9,1.5,4.17,6.43
Russia,Premier League,2020/2021,08/11/2020,16:00,Dynamo Moscow,Lokomotiv Moscow,5,1,H,2.68,3.29,2.81,2.8,3.32,3.07,2.59,3.17,2.75
Russia,Premier League,2020/2021,08/11/2020,16:00,Zenit,Krasnodar,3,1,H,1.66,4.19,5.11,1.72,4.6,5.51,1.63,4.13,4.88
Russia,Premier League,2020/2021,21/11/2020,11:00,Krasnodar,Tambov,1,0,H,1.42,4.51,8.82,1.44,5.05,9.7,1.4,4.48,7.84
Russia,Premier League,2020/2021,21/11/2020,13:30,Akhmat Grozny,Zenit,2,2,D,4.24,3.41,1.98,4.67,3.68,1.99,4.02,3.46,1.9
Russia,Premier League,2020/2021,21/11/2020,16:00,Lokomotiv Moscow,Arsenal Tula,1,0,H,1.74,3.81,5.03,1.77,3.91,5.2,1.72,3.67,4.75
Russia,Premier League,2020/2021,21/11/2020,16:00,Spartak Moscow,Dynamo Moscow,1,1,D,2.26,3.32,3.45,2.3,3.58,3.73,2.21,3.25,3.3
Russia,Premier League,2020/2021,22/11/2020,11:00,CSKA Moscow,Sochi,1,1,D,1.61,4.22,5.54,1.68,4.4,6.25,1.61,3.99,5.18
Russia,Premier League,2020/2021,22/11/2020,13:30,R. Volgograd,Ural,0,0,D,2.92,3.13,2.7,3.15,3.2,2.79,2.83,2.99,2.64
Russia,Premier League,2020/2021,22/11/2020,16:00,Rubin Kazan,FK Rostov,0,2,A,2.59,3.2,2.99,2.71,3.34,3.04,2.49,3.12,2.9
Russia,Premier League,2020/2021,23/11/2020,14:00,Ufa,Khimki,1,2,A,2.72,3.01,3,2.93,3.09,3.01,2.7,2.91,2.85
Russia,Premier League,2020/2021,28/11/2020,11:00,Arsenal Tula,Zenit,0,0,D,7.31,4.58,1.46,7.69,4.7,1.54,6.54,4.33,1.47
Russia,Premier League,2020/2021,28/11/2020,13:30,Khimki,Krasnodar,1,0,H,6,4.28,1.57,6.22,4.5,1.63,5.56,4.19,1.55
Russia,Premier League,2020/2021,28/11/2020,16:00,Akhmat Grozny,Lokomotiv Moscow,0,0,D,1.91,3.52,4.41,1.96,3.6,4.5,1.9,3.39,4.11
Russia,Premier League,2020/2021,28/11/2020,16:00,FK Rostov,Dynamo Moscow,4,1,H,3.61,3.15,2.28,3.76,3.24,2.36,3.49,3.08,2.2
Russia,Premier League,2020/2021,29/11/2020,09:00,Ural,Sochi,1,0,H,3.35,3.08,2.44,3.48,3.28,2.51,3.22,3.04,2.36
Russia,Premier League,2020/2021,29/11/2020,11:00,Ufa,Tambov,4,0,H,1.96,3.2,4.72,2.05,3.2,4.92,1.95,3.03,4.56
Russia,Premier League,2020/2021,29/11/2020,13:30,Rubin Kazan,CSKA Moscow,1,0,H,3.89,3.59,2,4.14,3.74,2.04,3.76,3.52,1.94
Russia,Premier League,2020/2021,29/11/2020,16:00,Spartak Moscow,R. Volgograd,2,0,H,1.39,4.89,8.82,1.41,5.4,10.75,1.36,4.79,8.4
Russia,Premier League,2020/2021,05/12/2020,11:00,Lokomotiv Moscow,Rubin Kazan,3,1,H,2.16,3.24,3.81,2.28,3.38,4.47,2.08,3.15,3.78
Russia,Premier League,2020/2021,05/12/2020,13:30,Spartak Moscow,Tambov,5,1,H,1.06,10.04,21.99,1.09,20.47,101,1.05,13.65,34.22
Russia,Premier League,2020/2021,05/12/2020,16:00,Krasnodar,R. Volgograd,5,0,H,1.33,5.31,10.12,1.38,6.17,11.8,1.29,5.35,9.68
Russia,Premier League,2020/2021,05/12/2020,16:00,Zenit,Ural,5,1,H,1.3,5.72,10.7,1.34,6.3,12.5,1.28,5.42,9.95
Russia,Premier League,2020/2021,06/12/2020,11:00,FK Rostov,Ufa,0,1,A,2.15,3.02,4.2,2.21,3.24,4.59,2.08,3,4.02
Russia,Premier League,2020/2021,06/12/2020,13:30,Dynamo Moscow,Arsenal Tula,1,0,H,1.66,3.72,6.01,1.73,4.19,6.49,1.6,3.78,5.75
Russia,Premier League,2020/2021,06/12/2020,16:00,CSKA Moscow,Khimki,2,2,D,1.46,4.64,7.33,1.51,4.92,8,1.43,4.48,6.97
Russia,Premier League,2020/2021,07/12/2020,16:00,Sochi,Akhmat Grozny,2,0,H,2.77,3.05,2.91,2.8,3.24,2.91,2.7,3.02,2.75
Russia,Premier League,2020/2021,11/12/2020,16:00,Khimki,Arsenal Tula,1,0,H,2.47,3.27,3.1,2.55,3.4,3.1,2.42,3.23,2.92
Russia,Premier League,2020/2021,12/12/2020,11:00,R. Volgograd,Ufa,1,0,H,3.36,3.02,2.47,3.44,3.15,2.53,3.24,2.93,2.41
Russia,Premier League,2020/2021,12/12/2020,13:30,Sochi,Spartak Moscow,1,0,H,3.05,3.17,2.57,3.19,3.31,2.61,2.92,3.14,2.47
Russia,Premier League,2020/2021,12/12/2020,16:00,Zenit,Dynamo Moscow,3,1,H,1.66,3.9,5.61,1.71,4.33,6.13,1.63,3.87,5.21
Russia,Premier League,2020/2021,13/12/2020,11:00,Tambov,Rubin Kazan,0,1,A,15.82,8.01,1.16,24.47,9.8,1.18,17.36,7.64,1.14
Russia,Premier League,2020/2021,13/12/2020,13:30,Krasnodar,Lokomotiv Moscow,5,0,H,1.72,3.94,4.96,1.76,4,5.17,1.7,3.79,4.67
Russia,Premier League,2020/2021,13/12/2020,16:00,Akhmat Grozny,FK Rostov,0,1,A,2.1,3.25,4,2.19,3.4,4.05,2.03,3.19,3.84
Russia,Premier League,2020/2021,13/12/2020,16:00,CSKA Moscow,Ural,2,2,D,1.33,5.24,10.17,1.39,5.48,10.4,1.34,4.89,8.77
Russia,Premier League,2020/2021,16/12/2020,15:00,R. Volgograd,Arsenal Tula,1,0,H,3.07,2.93,2.73,3.12,3.11,2.81,2.97,2.9,2.61
Russia,Premier League,2020/2021,16/12/2020,15:00,Sochi,Dynamo Moscow,2,0,H,2.71,3.14,2.89,2.76,3.25,2.99,2.64,3.08,2.77
Russia,Premier League,2020/2021,16/12/2020,17:00,Zenit,Spartak Moscow,3,1,H,1.76,3.9,4.7,1.81,4.3,4.89,1.73,3.83,4.42
Russia,Premier League,2020/2021,17/12/2020,15:00,Khimki,Lokomotiv Moscow,3,2,H,4.24,3.5,1.95,4.25,3.5,2.09,3.86,3.26,2.01
Russia,Premier League,2020/2021,17/12/2020,15:00,Krasnodar,Ufa,1,0,H,1.42,4.57,8.54,1.47,4.83,8.7,1.43,4.42,7.25
Russia,Premier League,2020/2021,17/12/2020,17:00,Akhmat Grozny,Rubin Kazan,0,0,D,2.3,3.15,3.56,2.4,3.28,3.85,2.25,3.1,3.37
Russia,Premier League,2020/2021,17/12/2020,17:00,FK Rostov,CSKA Moscow,1,3,A,3.63,3.33,2.18,3.72,3.33,2.3,3.41,3.2,2.18
Russia,Premier League,2020/2021,18/12/2020,15:00,Tambov,Ural,1,1,D,3.3,2.97,2.47,7.15,4.25,2.53,3.42,3.02,2.36
Russia,Premier League,2020/2021,26/02/2021,16:00,Tambov,R. Volgograd,1,3,A,3.52,3.3,2.18,4.46,3.44,2.23,3.5,3.17,2.14
Russia,Premier League,2020/2021,27/02/2021,11:00,Khimki,Ufa,2,1,H,2.3,3.07,3.67,2.38,3.51,3.8,2.2,3.09,3.48
Russia,Premier League,2020/2021,27/02/2021,13:30,Zenit,FK Rostov,2,2,D,1.35,5.09,9.7,1.44,5.6,10,1.37,4.77,8.21
Russia,Premier League,2020/2021,27/02/2021,16:00,Lokomotiv Moscow,CSKA Moscow,2,0,H,3.39,3.49,2.22,3.52,3.58,2.32,3.25,3.34,2.19
Russia,Premier League,2020/2021,27/02/2021,16:00,Sochi,Arsenal Tula,4,0,H,1.73,3.69,5.3,1.83,3.78,5.5,1.73,3.48,5.01
Russia,Premier League,2020/2021,28/02/2021,11:00,Spartak Moscow,Rubin Kazan,0,2,A,1.93,3.45,4.36,2.02,3.73,4.51,1.89,3.46,4.07
Russia,Premier League,2020/2021,28/02/2021,13:30,Akhmat Grozny,Dynamo Moscow,1,2,A,2.42,3.2,3.25,2.63,3.46,3.3,2.39,3.14,3.06
Russia,Premier League,2020/2021,28/02/2021,16:00,Krasnodar,Ural,2,2,D,1.5,4.34,7.02,1.53,4.68,7.43,1.48,4.3,6.36
Russia,Premier League,2020/2021,06/03/2021,11:00,CSKA Moscow,Akhmat Grozny,2,0,H,1.68,3.75,5.95,1.72,4.11,6.31,1.65,3.71,5.32
Russia,Premier League,2020/2021,06/03/2021,13:30,R. Volgograd,Khimki,0,0,D,2.59,3.14,3.09,2.84,3.2,3.11,2.63,3.05,2.82
Russia,Premier League,2020/2021,06/03/2021,16:00,FK Rostov,Sochi,0,0,D,3.34,3.13,2.45,3.4,3.36,2.76,3.24,3,2.37
Russia,Premier League,2020/2021,07/03/2021,11:00,Ural,Ufa,0,0,D,2.54,3.02,3.3,2.62,3.06,3.39,2.48,2.91,3.15
Russia,Premier League,2020/2021,07/03/2021,13:30,Dynamo Moscow,Tambov,2,0,H,1.09,11.52,46.94,1.09,19.9,100,1.05,12.18,48.25
Russia,Premier League,2020/2021,07/03/2021,16:00,Spartak Moscow,Krasnodar,6,1,H,2.4,3.55,3.04,2.49,3.63,3.2,2.29,3.42,2.99
Russia,Premier League,2020/2021,08/03/2021,11:00,Arsenal Tula,Lokomotiv Moscow,0,3,A,3.03,3.11,2.66,3.45,3.27,2.66,2.95,3.03,2.53
Russia,Premier League,2020/2021,08/03/2021,13:30,Rubin Kazan,Zenit,2,1,H,5.51,3.88,1.69,5.6,4.11,1.73,5.12,3.77,1.66
Russia,Premier League,2020/2021,12/03/2021,16:00,Khimki,FK Rostov,1,0,H,2.91,2.99,2.86,3.06,3.19,2.91,2.76,2.92,2.77
Russia,Premier League,2020/2021,13/03/2021,09:00,Ural,R. Volgograd,1,0,H,2.08,3.19,4.26,2.17,3.31,4.56,2.06,3.12,3.89
Russia,Premier League,2020/2021,13/03/2021,11:00,Arsenal Tula,CSKA Moscow,2,1,H,6.28,4.04,1.6,7.37,4.32,1.67,5.82,3.82,1.59
Russia,Premier League,2020/2021,13/03/2021,13:30,Zenit,Akhmat Grozny,4,0,H,1.35,5.24,10.18,1.39,5.53,11.2,1.32,5.05,8.98
Russia,Premier League,2020/2021,13/03/2021,16:00,Dynamo Moscow,Spartak Moscow,1,2,A,2.71,3.34,2.78,2.78,3.71,2.83,2.59,3.25,2.69
Russia,Premier League,2020/2021,14/03/2021,11:00,Ufa,Rubin Kazan,0,3,A,3.54,3.04,2.4,4.06,3.22,2.43,3.41,2.99,2.28
Russia,Premier League,2020/2021,14/03/2021,13:30,Tambov,Krasnodar,0,4,A,48.68,12.11,1.07,87.59,13.48,1.1,36.46,10.47,1.07
Russia,Premier League,2020/2021,14/03/2021,16:00,Lokomotiv Moscow,Sochi,3,1,H,2.14,3.2,4,2.25,3.52,4.19,2.11,3.12,3.69
Russia,Premier League,2020/2021,17/03/2021,15:00,R. Volgograd,FK Rostov,0,4,A,3.56,3.01,2.41,3.89,3.16,2.41,3.5,2.96,2.27
Russia,Premier League,2020/2021,17/03/2021,17:00,Akhmat Grozny,Arsenal Tula,2,0,H,1.97,3.35,4.48,2.04,3.57,4.54,1.92,3.27,4.21
Russia,Premier League,2020/2021,17/03/2021,17:00,CSKA Moscow,Zenit,2,3,A,3.33,3.35,2.33,3.42,3.57,2.37,3.16,3.25,2.27
Russia,Premier League,2020/2021,18/03/2021,14:00,Ufa,Lokomotiv Moscow,0,1,A,3.57,3.03,2.39,4.18,3.11,2.43,3.57,2.94,2.25
Russia,Premier League,2020/2021,18/03/2021,16:00,Krasnodar,Dynamo Moscow,2,3,A,1.81,4.01,4.38,2.1,4.36,4.64,1.82,3.81,3.98
Russia,Premier League,2020/2021,18/03/2021,16:00,Spartak Moscow,Ural,5,1,H,1.34,5.13,10.68,1.38,5.25,12.4,1.32,4.92,9.62
Russia,Premier League,2020/2021,19/03/2021,16:00,Rubin Kazan,Khimki,1,3,A,1.65,3.88,6,1.78,3.96,6.16,1.64,3.67,5.6
Russia,Premier League,2020/2021,19/03/2021,16:00,Sochi,Tambov,5,0,H,1.08,8.66,29.33,1.11,15.6,76.77,1.06,10.79,36.26
Russia,Premier League,2020/2021,03/04/2021,12:00,R. Volgograd,Lokomotiv Moscow,0,2,A,5.12,3.44,1.84,5.58,3.53,1.86,4.81,3.34,1.8
Russia,Premier League,2020/2021,03/04/2021,14:30,Krasnodar,Akhmat Grozny,0,5,A,1.63,4.24,5.51,1.76,4.27,5.7,1.61,4.02,5.16
Russia,Premier League,2020/2021,03/04/2021,14:30,Rubin Kazan,Sochi,1,0,H,2.53,3.24,3.08,2.54,3.26,3.13,2.44,3.13,3
Russia,Premier League,2020/2021,03/04/2021,17:00,Dynamo Moscow,Ufa,4,0,H,1.66,3.67,6.35,1.72,3.72,6.45,1.66,3.48,5.72
Russia,Premier League,2020/2021,04/04/2021,12:00,Ural,Arsenal Tula,2,0,H,2.73,3.02,3.02,2.73,3.14,3.36,2.59,2.96,2.95
Russia,Premier League,2020/2021,04/04/2021,14:30,Tambov,CSKA Moscow,1,2,A,18.11,7.08,1.18,71,18.6,1.14,30.93,13.16,1.05
Russia,Premier League,2020/2021,04/04/2021,17:00,FK Rostov,Spartak Moscow,2,3,A,3.51,3.41,2.23,3.91,3.55,2.28,3.38,3.25,2.17
Russia,Premier League,2020/2021,05/04/2021,17:00,Zenit,Khimki,2,0,H,1.14,9.11,21.24,1.19,9.11,21.24,1.14,7.96,16.62
Russia,Premier League,2020/2021,10/04/2021,12:00,Khimki,Tambov,1,0,H,,,,1.28,7.5,17,1.19,6.7,13.18
Russia,Premier League,2020/2021,10/04/2021,14:30,Ufa,Akhmat Grozny,3,0,H,3.21,3.14,2.52,3.31,3.3,2.66,3.06,3.01,2.47
Russia,Premier League,2020/2021,10/04/2021,17:00,FK Rostov,Rubin Kazan,0,1,A,2.83,3.13,2.83,3.02,3.41,2.89,2.81,3.04,2.64
Russia,Premier League,2020/2021,11/04/2021,12:00,Arsenal Tula,Krasnodar,1,0,H,4.62,3.61,1.86,4.91,3.8,1.9,4.26,3.54,1.84
Russia,Premier League,2020/2021,11/04/2021,14:30,Dynamo Moscow,Ural,2,2,D,1.43,4.57,8.97,1.48,4.73,9.47,1.4,4.42,8.23
Russia,Premier League,2020/2021,11/04/2021,14:30,Sochi,Zenit,1,2,A,5.8,4.28,1.6,6.4,4.45,1.65,5.44,4.05,1.58
Russia,Premier League,2020/2021,11/04/2021,17:00,Lokomotiv Moscow,Spartak Moscow,2,0,H,3.7,3.48,2.12,3.73,3.71,2.21,3.47,3.39,2.09
Russia,Premier League,2020/2021,12/04/2021,17:00,CSKA Moscow,R. Volgograd,2,0,H,1.25,6.35,13.23,1.3,6.4,13.3,1.26,5.69,10.73
Russia,Premier League,2020/2021,17/04/2021,12:00,Akhmat Grozny,Khimki,3,1,H,1.9,3.39,4.77,2.07,3.65,4.9,1.91,3.28,4.26
Russia,Premier League,2020/2021,17/04/2021,14:30,Lokomotiv Moscow,FK Rostov,4,1,H,1.83,3.63,4.84,1.95,3.7,4.9,1.83,3.46,4.42
Russia,Premier League,2020/2021,17/04/2021,14:30,R. Volgograd,Dynamo Moscow,0,3,A,5.24,3.5,1.81,5.78,3.68,1.87,5,3.43,1.76
Russia,Premier League,2020/2021,17/04/2021,17:00,Krasnodar,Zenit,2,2,D,4.77,4.3,1.7,5.89,4.55,1.73,4.82,4.2,1.63
Russia,Premier League,2020/2021,18/04/2021,10:00,Ural,Rubin Kazan,0,1,A,4.79,3.79,1.79,5,3.86,1.86,4.57,3.58,1.77
Russia,Premier League,2020/2021,18/04/2021,12:00,Arsenal Tula,Tambov,4,0,H,1.1,6.69,14.24,1.19,13.4,28.11,1.12,8.43,18.34
Russia,Premier League,2020/2021,18/04/2021,14:30,Sochi,CSKA Moscow,2,1,H,3.07,3.39,2.46,3.39,3.6,2.58,2.95,3.28,2.39
Russia,Premier League,2020/2021,18/04/2021,17:00,Spartak Moscow,Ufa,0,3,A,1.5,4.32,7.43,1.53,4.46,8.48,1.48,4.12,6.88
Russia,Premier League,2020/2021,24/04/2021,12:00,Ural,Akhmat Grozny,1,1,D,2.93,3.19,2.68,2.93,3.45,2.83,2.73,3.1,2.68
Russia,Premier League,2020/2021,24/04/2021,14:30,Zenit,R. Volgograd,6,0,H,1.08,12.93,36.3,1.11,14.5,44.13,1.07,11.24,29.12
Russia,Premier League,2020/2021,24/04/2021,17:00,Dynamo Moscow,Khimki,0,1,A,1.4,5.07,8.44,1.47,5.07,9,1.39,4.71,7.67
Russia,Premier League,2020/2021,24/04/2021,17:00,Tambov,Lokomotiv Moscow,2,5,A,14.07,10.39,1.09,34,14,1.15,22.64,10.76,1.08
Russia,Premier League,2020/2021,25/04/2021,12:00,Ufa,Sochi,2,3,A,3.14,3.1,2.59,3.44,3.14,2.64,3.03,3,2.51
Russia,Premier League,2020/2021,25/04/2021,14:30,FK Rostov,Arsenal Tula,1,0,H,2.3,3.23,3.52,2.41,3.34,3.76,2.26,3.16,3.32
Russia,Premier League,2020/2021,25/04/2021,14:30,Spartak Moscow,CSKA Moscow,1,0,H,2.42,3.61,2.97,2.56,3.68,3.1,2.39,3.45,2.84
Russia,Premier League,2020/2021,25/04/2021,17:00,Rubin Kazan,Krasnodar,0,1,A,2.53,3.67,2.78,2.66,3.67,2.98,2.46,3.46,2.75
Russia,Premier League,2020/2021,01/05/2021,12:00,R. Volgograd,Akhmat Grozny,1,0,H,3.45,3.49,2.21,3.51,3.49,2.47,3.29,3.3,2.21
Russia,Premier League,2020/2021,01/05/2021,12:00,Rubin Kazan,Dynamo Moscow,2,0,H,3.17,3.35,2.42,3.25,3.68,2.57,3,3.27,2.37
Russia,Premier League,2020/2021,01/05/2021,14:30,CSKA Moscow,Ufa,1,1,D,1.65,3.94,5.79,1.71,3.98,6.17,1.65,3.74,5.37
Russia,Premier League,2020/2021,01/05/2021,17:00,Krasnodar,Sochi,1,3,A,2.01,3.82,3.71,2.1,3.99,3.81,2,3.67,3.48
Russia,Premier League,2020/2021,02/05/2021,12:00,Khimki,Ural,1,0,H,2.53,3.21,3.11,2.55,3.55,3.12,2.44,3.17,2.98
Russia,Premier League,2020/2021,02/05/2021,14:30,FK Rostov,Tambov,2,0,H,,,,1.1,21,67,1.06,12.76,30.48
Russia,Premier League,2020/2021,02/05/2021,17:00,Zenit,Lokomotiv Moscow,6,1,H,1.44,4.99,7.33,1.49,5.45,8.4,1.42,4.83,6.84
Russia,Premier League,2020/2021,03/05/2021,14:30,Arsenal Tula,Spartak Moscow,1,2,A,4.71,3.9,1.78,5.24,4.01,1.8,4.59,3.78,1.73
Russia,Premier League,2020/2021,07/05/2021,16:00,Akhmat Grozny,Tambov,3,1,H,,,,1.12,21,101,1.06,13.44,35.98
Russia,Premier League,2020/2021,07/05/2021,18:00,Sochi,R. Volgograd,2,1,H,1.37,5.04,9.6,1.4,5.37,10.8,1.35,4.81,8.93
Russia,Premier League,2020/2021,08/05/2021,12:00,Ufa,Zenit,0,0,D,3.41,3.51,2.22,3.81,3.97,2.25,3.39,3.61,2.04
Russia,Premier League,2020/2021,08/05/2021,14:30,Arsenal Tula,Rubin Kazan,2,4,A,2.89,3.11,2.78,3.07,3.29,2.85,2.81,3.04,2.66
Russia,Premier League,2020/2021,08/05/2021,14:30,Lokomotiv Moscow,Dynamo Moscow,0,0,D,2.78,3.33,2.72,2.85,3.46,2.76,2.72,3.23,2.6
Russia,Premier League,2020/2021,08/05/2021,17:30,CSKA Moscow,Krasnodar,3,1,H,1.84,4.31,3.94,1.95,4.65,4.2,1.81,4.09,3.82
Russia,Premier League,2020/2021,10/05/2021,14:30,Ural,FK Rostov,1,0,H,3.18,2.94,2.68,3.37,3.29,2.77,2.99,2.98,2.57
Russia,Premier League,2020/2021,10/05/2021,17:00,Spartak Moscow,Khimki,2,1,H,1.3,5.83,10.99,1.36,6,11.25,1.3,5.55,9.51
Russia,Premier League,2020/2021,16/05/2021,12:00,Akhmat Grozny,Spartak Moscow,2,2,D,3.77,3.55,2.02,4.27,3.85,2.05,3.71,3.58,1.96
Russia,Premier League,2020/2021,16/05/2021,12:00,Dynamo Moscow,CSKA Moscow,3,2,H,3.14,3.61,2.23,3.64,3.72,2.33,3.15,3.52,2.18
Russia,Premier League,2020/2021,16/05/2021,12:00,FK Rostov,Krasnodar,1,3,A,2.91,3.54,2.39,3.01,3.78,2.49,2.87,3.49,2.35
Russia,Premier League,2020/2021,16/05/2021,12:00,Khimki,Sochi,0,0,D,4.69,3.95,1.73,5,4.11,1.78,4.59,3.82,1.72
Russia,Premier League,2020/2021,16/05/2021,12:00,Lokomotiv Moscow,Ural,1,0,H,1.39,4.76,8.93,1.45,5.26,9.3,1.38,4.84,8.01
Russia,Premier League,2020/2021,16/05/2021,12:00,Rubin Kazan,R. Volgograd,1,1,D,1.51,4.15,7.09,1.58,4.56,7.5,1.5,4.12,6.66
Russia,Premier League,2020/2021,16/05/2021,12:00,Tambov,Zenit,1,5,A,,,,51,19.8,1.11,24.54,12.25,1.07
Russia,Premier League,2020/2021,16/05/2021,12:00,Ufa,Arsenal Tula,2,1,H,2.09,2.99,4.33,2.18,3.13,4.95,2.05,2.98,4.24
Russia,Premier League,2021/2022,23/07/2021,18:00,FK Rostov,Dynamo Moscow,0,2,A,3.32,3.25,2.39,3.72,3.32,2.41,3.21,3.12,2.33
Russia,Premier League,2021/2022,24/07/2021,15:30,Khimki,Zenit,1,3,A,9.64,5.82,1.32,12.9,6.55,1.34,9.89,5.54,1.29
Russia,Premier League,2021/2022,24/07/2021,18:00,Lokomotiv Moscow,Arsenal Tula,3,1,H,1.64,3.87,6.13,1.7,3.94,6.68,1.63,3.71,5.67
Russia,Premier League,2021/2022,24/07/2021,18:00,Rubin Kazan,Spartak Moscow,1,0,H,3.64,3.77,2.04,4.01,3.85,2.18,3.51,3.57,2.02
Russia,Premier League,2021/2022,25/07/2021,15:30,Ural,Krasnodar,0,3,A,3.61,3.4,2.19,4.74,3.77,2.23,3.53,3.32,2.1
Russia,Premier League,2021/2022,25/07/2021,17:00,FK Krylya Sovetov Samara,Akhmat Grozny,1,2,A,2.06,3.52,3.86,2.23,3.64,3.86,2.07,3.3,3.6
Russia,Premier League,2021/2022,25/07/2021,18:00,CSKA Moscow,Ufa,1,0,H,1.67,3.81,5.92,1.73,4.21,6.33,1.66,3.65,5.47
Russia,Premier League,2021/2022,26/07/2021,17:00,Nizhny Novgorod,Sochi,1,0,H,4.45,3.05,2.1,4.86,3.2,2.15,4.21,3.01,2.04
Russia,Premier League,2021/2022,30/07/2021,17:00,Arsenal Tula,Rubin Kazan,0,3,A,3.46,3.41,2.24,3.76,3.48,2.29,3.33,3.26,2.19
Russia,Premier League,2021/2022,30/07/2021,17:00,FK Krylya Sovetov Samara,Spartak Moscow,0,1,A,3.9,3.44,2.08,4.42,3.69,2.11,3.77,3.44,1.98
Russia,Premier League,2021/2022,31/07/2021,15:30,Ufa,Dynamo Moscow,2,3,A,4.1,3.22,2.11,4.53,3.3,2.19,3.8,3.13,2.1
Russia,Premier League,2021/2022,31/07/2021,18:00,CSKA Moscow,Lokomotiv Moscow,1,2,A,2.18,3.39,3.63,2.34,3.5,3.72,2.15,3.28,3.44
Russia,Premier League,2021/2022,01/08/2021,15:30,Ural,Nizhny Novgorod,1,1,D,2.19,3.07,4.06,2.2,3.35,4.39,2.12,3,3.89
Russia,Premier League,2021/2022,01/08/2021,18:00,FK Rostov,Zenit,2,4,A,7.41,4.49,1.48,9.25,4.5,1.54,6.91,4.29,1.47
Russia,Premier League,2021/2022,01/08/2021,18:00,Krasnodar,Khimki,0,1,A,1.55,4.38,6.36,1.65,4.61,6.36,1.56,4.16,5.65
Russia,Premier League,2021/2022,02/08/2021,18:00,Akhmat Grozny,Sochi,1,2,A,2.75,3.22,2.83,2.79,3.5,2.9,2.65,3.11,2.75
Russia,Premier League,2021/2022,06/08/2021,15:00,Ufa,Lokomotiv Moscow,1,1,D,3.24,3.26,2.43,3.5,3.43,2.44,3.21,3.2,2.29
Russia,Premier League,2021/2022,07/08/2021,15:00,Zenit,Krasnodar,3,2,H,1.46,4.94,6.87,1.53,4.97,7.5,1.45,4.7,6.41
Russia,Premier League,2021/2022,07/08/2021,15:30,Arsenal Tula,FK Krylya Sovetov Samara,2,1,H,2.88,3.41,2.59,3.12,3.41,2.65,2.92,3.18,2.46
Russia,Premier League,2021/2022,07/08/2021,18:00,Spartak Moscow,Nizhny Novgorod,1,2,A,1.47,4.66,7.35,1.48,4.8,7.9,1.44,4.43,6.92
Russia,Premier League,2021/2022,08/08/2021,15:30,Khimki,FK Rostov,1,1,D,2.96,3.11,2.72,3.13,3.38,2.83,2.86,3.04,2.61
Russia,Premier League,2021/2022,08/08/2021,18:00,Dynamo Moscow,CSKA Moscow,2,1,H,2.75,3.22,2.83,2.78,3.34,3,2.58,3.15,2.79
Russia,Premier League,2021/2022,08/08/2021,18:00,Rubin Kazan,Akhmat Grozny,2,1,H,2.2,3.47,3.5,2.25,3.54,3.81,2.14,3.37,3.34
Russia,Premier League,2021/2022,09/08/2021,17:00,Sochi,Ural,2,0,H,1.64,3.9,6.1,1.75,3.91,6.34,1.63,3.7,5.66
Russia,Premier League,2021/2022,14/08/2021,15:30,Nizhny Novgorod,Ufa,1,2,A,3.44,2.95,2.51,3.5,3.21,2.55,3.24,2.89,2.44
Russia,Premier League,2021/2022,14/08/2021,15:30,Spartak Moscow,Ural,1,0,H,1.43,4.61,8.79,1.46,4.86,9.21,1.4,4.48,8.05
Russia,Premier League,2021/2022,14/08/2021,18:00,Akhmat Grozny,Dynamo Moscow,2,1,H,3.23,3.46,2.33,3.4,3.53,2.43,3.08,3.31,2.29
Russia,Premier League,2021/2022,14/08/2021,18:00,FK Rostov,CSKA Moscow,1,3,A,3.7,3.31,2.19,3.75,3.45,2.33,3.45,3.22,2.16
Russia,Premier League,2021/2022,15/08/2021,15:30,Lokomotiv Moscow,Zenit,1,1,D,4.94,3.78,1.78,4.96,4.05,1.84,4.49,3.72,1.75
Russia,Premier League,2021/2022,15/08/2021,18:00,Krasnodar,Arsenal Tula,3,2,H,1.5,4.66,6.71,1.52,4.85,7.6,1.47,4.5,6.33
Russia,Premier League,2021/2022,15/08/2021,18:00,Rubin Kazan,FK Krylya Sovetov Samara,1,1,D,2.68,3.41,2.77,2.72,3.45,2.97,2.54,3.23,2.76
Russia,Premier League,2021/2022,16/08/2021,17:00,Sochi,Khimki,3,0,H,1.85,3.52,4.87,1.95,3.78,4.92,1.84,3.42,4.38
Russia,Premier League,2021/2022,21/08/2021,14:00,Arsenal Tula,Spartak Moscow,1,1,D,5.99,4.14,1.61,6.65,4.2,1.67,5.57,3.91,1.6
Russia,Premier League,2021/2022,21/08/2021,14:00,CSKA Moscow,Akhmat Grozny,2,0,H,1.56,4.36,6.13,1.67,4.48,6.14,1.56,4.1,5.62
Russia,Premier League,2021/2022,21/08/2021,16:00,Ufa,Zenit,1,1,D,8.54,5.29,1.38,9.23,5.5,1.4,7.91,5.06,1.36
Russia,Premier League,2021/2022,21/08/2021,16:00,Ural,Dynamo Moscow,0,1,A,6.02,3.92,1.64,6.25,4.1,1.7,5.66,3.76,1.62
Russia,Premier League,2021/2022,21/08/2021,18:00,FK Krylya Sovetov Samara,Sochi,1,0,H,2.56,3.33,2.97,2.65,3.54,3,2.53,3.21,2.82
Russia,Premier League,2021/2022,22/08/2021,14:00,Lokomotiv Moscow,Krasnodar,2,1,H,2.79,3.57,2.57,2.93,3.7,2.7,2.69,3.45,2.51
Russia,Premier League,2021/2022,22/08/2021,16:00,Nizhny Novgorod,FK Rostov,1,2,A,3.52,3.16,2.34,3.88,3.18,2.56,3.33,3.02,2.33
Russia,Premier League,2021/2022,22/08/2021,18:00,Khimki,Rubin Kazan,1,1,D,2.34,3.39,3.27,2.6,3.39,3.29,2.38,3.21,3.04
Russia,Premier League,2021/2022,26/08/2021,14:30,Ufa,FK Krylya Sovetov Samara,1,2,A,2.76,3.14,2.89,2.8,3.3,2.97,2.67,3.04,2.8
Russia,Premier League,2021/2022,26/08/2021,16:30,Spartak Moscow,Sochi,1,2,A,1.94,3.56,4.3,2.01,3.65,4.49,1.92,3.45,3.98
Russia,Premier League,2021/2022,26/08/2021,18:30,Akhmat Grozny,Arsenal Tula,2,1,H,1.74,3.62,5.63,1.8,3.75,5.63,1.72,3.54,5.06
Russia,Premier League,2021/2022,26/08/2021,18:45,Zenit,CSKA Moscow,1,0,H,1.5,4.7,6.67,1.55,4.85,7.4,1.48,4.51,6.11
Russia,Premier League,2021/2022,27/08/2021,14:30,Ural,FK Rostov,1,1,D,3.54,3.08,2.38,3.69,3.22,2.45,3.41,3.03,2.28
Russia,Premier League,2021/2022,27/08/2021,16:30,Khimki,Nizhny Novgorod,1,1,D,2.05,3.3,4.22,2.15,3.64,4.26,2.08,3.22,3.72
Russia,Premier League,2021/2022,27/08/2021,17:00,Dynamo Moscow,Lokomotiv Moscow,1,1,D,1.95,3.6,4.17,2.3,3.7,4.18,2.05,3.41,3.62
Russia,Premier League,2021/2022,27/08/2021,18:30,Krasnodar,Rubin Kazan,2,0,H,1.55,4.48,6.2,1.68,4.48,6.31,1.55,4.2,5.59
Russia,Premier League,2021/2022,11/09/2021,12:00,Lokomotiv Moscow,FK Krylya Sovetov Samara,2,0,H,2.19,3.33,3.68,2.29,3.93,4.5,2.08,3.31,3.63
Russia,Premier League,2021/2022,11/09/2021,14:30,Zenit,Akhmat Grozny,3,1,H,1.35,5.46,9.13,1.38,5.65,11,1.34,5.17,8.43
Russia,Premier League,2021/2022,11/09/2021,17:00,Spartak Moscow,Khimki,3,1,H,1.55,4.37,6.35,1.62,4.52,7.03,1.51,4.19,6.18
Russia,Premier League,2021/2022,12/09/2021,12:00,Arsenal Tula,CSKA Moscow,2,2,D,5.39,3.87,1.7,6.2,3.9,1.83,5,3.72,1.69
Russia,Premier League,2021/2022,12/09/2021,14:30,Sochi,Ufa,3,1,H,1.67,3.82,5.88,1.75,3.85,6,1.68,3.62,5.32
Russia,Premier League,2021/2022,12/09/2021,17:00,Dynamo Moscow,Nizhny Novgorod,1,2,A,1.3,5.54,12.07,1.32,5.75,12.77,1.29,5.26,10.93
Russia,Premier League,2021/2022,13/09/2021,16:30,Rubin Kazan,Ural,4,0,H,1.65,4.01,5.66,1.7,4.02,6.37,1.64,3.77,5.34
Russia,Premier League,2021/2022,13/09/2021,17:30,FK Rostov,Krasnodar,1,1,D,3.88,3.64,2.02,4.2,3.74,2.08,3.68,3.49,1.99
Russia,Premier League,2021/2022,18/09/2021,12:00,Ufa,Khimki,3,2,H,2.3,3.38,3.36,2.54,3.42,3.49,2.37,3.22,3.04
Russia,Premier League,2021/2022,18/09/2021,14:30,FK Krylya Sovetov Samara,FK Rostov,4,2,H,2.31,3.23,3.5,2.5,3.46,3.58,2.31,3.12,3.26
Russia,Premier League,2021/2022,18/09/2021,17:00,Akhmat Grozny,Krasnodar,0,2,A,2.75,3.3,2.77,2.96,3.45,2.79,2.68,3.24,2.66
Russia,Premier League,2021/2022,19/09/2021,14:30,Nizhny Novgorod,Arsenal Tula,2,3,A,2.49,3.1,3.3,2.57,3.23,3.3,2.43,3.05,3.1
Russia,Premier League,2021/2022,19/09/2021,17:00,Sochi,Dynamo Moscow,0,1,A,2.38,3.47,3.14,2.74,3.47,3.22,2.35,3.28,3.02
Russia,Premier League,2021/2022,20/09/2021,14:30,Ural,Lokomotiv Moscow,0,0,D,4.67,3.55,1.88,4.96,3.69,1.9,4.41,3.44,1.84
Russia,Premier League,2021/2022,20/09/2021,16:30,Rubin Kazan,Zenit,1,3,A,4.75,4.05,1.75,5.06,4.3,1.8,4.51,3.95,1.71
Russia,Premier League,2021/2022,20/09/2021,17:30,CSKA Moscow,Spartak Moscow,1,0,H,2.38,3.47,3.13,2.5,3.58,3.17,2.34,3.33,2.99
Russia,Premier League,2021/2022,25/09/2021,12:00,Khimki,Lokomotiv Moscow,0,0,D,3.41,3.45,2.25,3.73,3.65,2.27,3.31,3.33,2.17
Russia,Premier League,2021/2022,25/09/2021,14:30,Zenit,FK Krylya Sovetov Samara,2,1,H,1.27,6.47,10.16,1.32,6.59,13.1,1.26,6,10.1
Russia,Premier League,2021/2022,25/09/2021,17:00,Spartak Moscow,Ufa,2,0,H,1.54,4.42,6.42,1.6,4.64,7.28,1.52,4.19,6.08
Russia,Premier League,2021/2022,26/09/2021,12:00,Dynamo Moscow,Rubin Kazan,2,0,H,1.75,3.82,5.11,1.8,4,5.18,1.71,3.72,4.8
Russia,Premier League,2021/2022,26/09/2021,14:30,FK Rostov,Akhmat Grozny,1,2,A,2.74,3.01,3.03,2.79,3.2,3.05,2.61,3.01,2.86
Russia,Premier League,2021/2022,26/09/2021,17:00,Krasnodar,Sochi,3,0,H,2.2,3.53,3.44,2.3,3.61,3.52,2.18,3.41,3.25
Russia,Premier League,2021/2022,27/09/2021,15:00,Ural,Arsenal Tula,2,0,H,2.91,3.15,2.73,3,3.32,2.82,2.83,3.05,2.63
Russia,Premier League,2021/2022,27/09/2021,17:00,Nizhny Novgorod,CSKA Moscow,0,2,A,5.93,4.08,1.62,6.18,4.12,1.69,5.54,3.87,1.61
Russia,Premier League,2021/2022,02/10/2021,12:00,Rubin Kazan,Nizhny Novgorod,0,1,A,1.99,3.35,4.41,1.99,3.55,4.8,1.92,3.31,4.25
Russia,Premier League,2021/2022,02/10/2021,14:30,Dynamo Moscow,FK Krylya Sovetov Samara,0,1,A,1.72,4.01,4.95,1.73,4.1,5.87,1.68,3.82,4.88
Russia,Premier League,2021/2022,02/10/2021,17:00,Arsenal Tula,Khimki,0,0,D,2.94,3.25,2.63,3.09,3.44,2.7,2.87,3.18,2.5
Russia,Premier League,2021/2022,02/10/2021,17:00,CSKA Moscow,Krasnodar,0,0,D,2.39,3.63,2.99,2.5,3.66,3.1,2.36,3.44,2.88
Russia,Premier League,2021/2022,03/10/2021,12:00,Ufa,Ural,0,1,A,1.96,3.41,4.41,2.05,3.46,4.67,1.92,3.31,4.21
Russia,Premier League,2021/2022,03/10/2021,14:30,Zenit,Sochi,1,2,A,1.36,5.64,8.4,1.41,5.64,9,1.37,5.13,7.63
Russia,Premier League,2021/2022,03/10/2021,17:00,Akhmat Grozny,Spartak Moscow,0,1,A,3,3.24,2.59,3.35,3.45,2.6,2.93,3.22,2.45
Russia,Premier League,2021/2022,03/10/2021,17:00,Lokomotiv Moscow,FK Rostov,1,2,A,2.06,3.48,3.91,2.11,3.53,4.54,1.99,3.37,3.82
Russia,Premier League,2021/2022,16/10/2021,12:00,Arsenal Tula,Zenit,2,1,H,9.67,5.42,1.34,11.75,5.65,1.4,8.88,5.18,1.32
Russia,Premier League,2021/2022,16/10/2021,14:30,Rubin Kazan,Lokomotiv Moscow,2,2,D,2.24,3.45,3.42,2.6,3.72,3.51,2.21,3.33,3.22
Russia,Premier League,2021/2022,16/10/2021,17:00,Sochi,FK Rostov,3,2,H,1.65,3.92,5.96,1.8,4.17,5.97,1.65,3.74,5.31
Russia,Premier League,2021/2022,16/10/2021,17:00,Spartak Moscow,Dynamo Moscow,2,2,D,2.67,3.29,2.86,2.71,3.45,3,2.54,3.2,2.78
Russia,Premier League,2021/2022,17/10/2021,12:00,Ural,CSKA Moscow,0,1,A,4.67,3.51,1.88,5.29,3.73,1.91,4.51,3.47,1.8
Russia,Premier League,2021/2022,17/10/2021,14:30,FK Krylya Sovetov Samara,Nizhny Novgorod,2,0,H,1.65,4.03,5.64,1.75,4.03,5.64,1.67,3.71,5.05
Russia,Premier League,2021/2022,17/10/2021,14:30,Khimki,Akhmat Grozny,2,0,H,3.01,3.1,2.69,3.06,3.25,2.7,2.88,3.05,2.56
Russia,Premier League,2021/2022,17/10/2021,17:00,Krasnodar,Ufa,1,1,D,1.36,5.67,8.18,1.4,5.67,9.4,1.35,5.19,7.84
Russia,Premier League,2021/2022,22/10/2021,17:00,Dynamo Moscow,Khimki,4,1,H,1.58,4.08,6.45,1.63,4.33,7.08,1.55,3.96,6.06
Russia,Premier League,2021/2022,23/10/2021,12:00,Nizhny Novgorod,Krasnodar,1,4,A,6.71,4.58,1.51,7,4.6,1.56,6.19,4.31,1.49
Russia,Premier League,2021/2022,23/10/2021,14:30,FK Rostov,Arsenal Tula,4,0,H,1.83,3.68,4.75,1.94,3.72,4.81,1.83,3.49,4.3
Russia,Premier League,2021/2022,23/10/2021,17:00,CSKA Moscow,FK Krylya Sovetov Samara,3,1,H,1.8,3.83,4.68,1.91,3.95,5.09,1.77,3.7,4.35
Russia,Premier League,2021/2022,24/10/2021,12:00,Ufa,Rubin Kazan,1,1,D,2.76,3.24,2.81,3.08,3.37,2.87,2.71,3.14,2.66
Russia,Premier League,2021/2022,24/10/2021,14:30,Akhmat Grozny,Ural,1,0,H,1.72,3.56,5.89,1.75,3.82,6.41,1.66,3.57,5.48
Russia,Premier League,2021/2022,24/10/2021,17:00,Zenit,Spartak Moscow,7,1,H,1.55,4.14,7.01,1.6,4.75,7.04,1.51,4.18,6.14
Russia,Premier League,2021/2022,25/10/2021,17:00,Lokomotiv Moscow,Sochi,2,1,H,3.05,3.37,2.48,3.1,3.59,2.7,2.89,3.26,2.43
Russia,Premier League,2021/2022,29/10/2021,17:00,Zenit,Dynamo Moscow,4,1,H,1.56,4.37,6.25,1.6,4.7,7.06,1.52,4.27,5.91
Russia,Premier League,2021/2022,30/10/2021,12:00,Rubin Kazan,CSKA Moscow,1,0,H,3.78,3.64,2.04,3.94,3.81,2.27,3.52,3.44,2.04
Russia,Premier League,2021/2022,30/10/2021,14:30,Spartak Moscow,FK Rostov,1,1,D,1.68,3.84,5.73,1.76,3.9,6.08,1.66,3.71,5.15
Russia,Premier League,2021/2022,30/10/2021,17:00,Krasnodar,FK Krylya Sovetov Samara,0,1,A,1.52,4.7,6.31,1.52,4.85,7.24,1.47,4.51,6.13
Russia,Premier League,2021/2022,30/10/2021,17:00,Nizhny Novgorod,Lokomotiv Moscow,1,2,A,4.79,3.59,1.85,5.01,3.63,1.95,4.23,3.41,1.87
Russia,Premier League,2021/2022,31/10/2021,11:00,Ufa,Akhmat Grozny,1,0,H,2.89,3,2.87,2.89,3.1,3,2.78,2.92,2.76
Russia,Premier League,2021/2022,31/10/2021,13:30,Arsenal Tula,Sochi,1,2,A,4.95,3.89,1.75,5.09,3.95,1.77,4.63,3.75,1.72
Russia,Premier League,2021/2022,31/10/2021,16:00,Khimki,Ural,0,0,D,1.98,3.35,4.41,2.13,3.48,4.79,1.94,3.29,4.07
Russia,Premier League,2021/2022,06/11/2021,11:00,Arsenal Tula,Ufa,0,0,D,3.27,3.31,2.38,3.3,3.42,2.75,3.04,3.12,2.44
Russia,Premier League,2021/2022,06/11/2021,13:30,Dynamo Moscow,Krasnodar,1,0,H,2.75,3.46,2.66,2.95,3.75,2.76,2.67,3.33,2.59
Russia,Premier League,2021/2022,06/11/2021,13:30,FK Krylya Sovetov Samara,Khimki,3,0,H,1.83,3.66,4.75,1.9,3.69,4.95,1.83,3.48,4.42
Russia,Premier League,2021/2022,06/11/2021,16:00,Sochi,CSKA Moscow,4,1,H,2.42,3.29,3.22,2.43,3.44,3.32,2.31,3.26,3.1
Russia,Premier League,2021/2022,07/11/2021,11:00,Ural,Zenit,0,0,D,11.35,5.68,1.3,13.5,6,1.3,10.74,5.51,1.27
Russia,Premier League,2021/2022,07/11/2021,13:30,FK Rostov,Rubin Kazan,5,1,H,2.26,3.35,3.48,2.55,3.36,3.51,2.29,3.2,3.19
Russia,Premier League,2021/2022,07/11/2021,16:00,Akhmat Grozny,Nizhny Novgorod,3,1,H,1.65,3.77,6.31,1.75,3.77,6.76,1.65,3.59,5.65
Russia,Premier League,2021/2022,07/11/2021,16:00,Spartak Moscow,Lokomotiv Moscow,1,1,D,2.2,3.51,3.45,2.22,3.88,3.62,2.12,3.45,3.34
Russia,Premier League,2021/2022,19/11/2021,16:00,Zenit,Nizhny Novgorod,5,1,H,1.12,10.21,23.74,1.16,12.3,27,1.11,9.41,20.43
Russia,Premier League,2021/2022,20/11/2021,11:00,FK Krylya Sovetov Samara,Ural,1,1,D,1.7,3.64,5.88,1.9,3.75,6.2,1.69,3.51,5.42
Russia,Premier League,2021/2022,20/11/2021,13:30,Lokomotiv Moscow,Akhmat Grozny,1,2,A,2.59,3.18,3.06,2.59,3.35,4,2.43,3.15,3.03
Russia,Premier League,2021/2022,20/11/2021,16:00,Krasnodar,Spartak Moscow,2,1,H,1.74,4.29,4.5,1.85,4.4,4.53,1.75,3.97,4.23
Russia,Premier League,2021/2022,21/11/2021,11:00,CSKA Moscow,Khimki,0,0,D,1.54,4.34,6.5,1.6,4.63,6.95,1.52,4.17,6.16
Russia,Premier League,2021/2022,21/11/2021,11:00,FK Rostov,Ufa,2,2,D,2.22,3.12,3.87,2.25,3.53,4,2.15,3.13,3.64
Russia,Premier League,2021/2022,21/11/2021,13:30,Dynamo Moscow,Arsenal Tula,5,1,H,1.42,4.7,8.85,1.45,5,9,1.39,4.62,8.09
Russia,Premier League,2021/2022,21/11/2021,16:30,Sochi,Rubin Kazan,1,2,A,1.54,4.32,6.64,1.6,4.59,6.65,1.52,4.18,6.14
Russia,Premier League,2021/2022,27/11/2021,11:00,Ural,Sochi,1,1,D,4.49,3.16,2.04,4.92,3.57,2.07,4.35,3.22,1.93
Russia,Premier League,2021/2022,27/11/2021,13:30,Akhmat Grozny,FK Rostov,2,0,H,2.09,3.24,4.12,2.25,3.32,4.12,2.09,3.17,3.74
Russia,Premier League,2021/2022,27/11/2021,16:00,Khimki,Krasnodar,3,3,D,5.31,4.3,1.64,5.81,4.3,1.75,5.07,4.01,1.63
Russia,Premier League,2021/2022,28/11/2021,11:00,Nizhny Novgorod,FK Krylya Sovetov Samara,0,0,D,4.21,3.47,1.99,4.33,3.68,2.14,3.92,3.37,1.96
Russia,Premier League,2021/2022,28/11/2021,13:30,Rubin Kazan,Dynamo Moscow,2,3,A,3.81,3.62,2.04,4.05,3.81,2.13,3.62,3.48,2.01
Russia,Premier League,2021/2022,28/11/2021,17:00,CSKA Moscow,Zenit,0,2,A,4.19,3.63,1.94,4.45,4.18,1.94,4.13,3.65,1.83
Russia,Premier League,2021/2022,29/11/2021,14:00,Ufa,Spartak Moscow,1,1,D,2.94,3.19,2.68,3.3,3.45,2.7,2.92,3.14,2.5
Russia,Premier League,2021/2022,29/11/2021,16:00,Arsenal Tula,Lokomotiv Moscow,3,1,H,3.37,3.46,2.26,3.65,3.52,2.4,3.25,3.31,2.22
Russia,Premier League,2021/2022,03/12/2021,16:00,Zenit,FK Rostov,2,2,D,1.19,7.59,16.22,1.25,7.59,16.25,1.21,6.78,12.54
Russia,Premier League,2021/2022,04/12/2021,11:00,FK Krylya Sovetov Samara,CSKA Moscow,0,1,A,3.04,3.19,2.59,3.17,3.35,2.63,2.99,3.17,2.44
Russia,Premier League,2021/2022,04/12/2021,14:00,Spartak Moscow,Akhmat Grozny,2,1,H,2.2,3.41,3.57,2.23,3.41,3.95,2.14,3.26,3.5
Russia,Premier League,2021/2022,04/12/2021,16:00,Lokomotiv Moscow,Ural,0,1,A,1.79,3.53,5.26,1.88,3.65,6,1.76,3.38,5.15
Russia,Premier League,2021/2022,05/12/2021,11:00,Khimki,Arsenal Tula,1,2,A,1.98,3.37,4.39,2.11,3.55,4.44,1.96,3.34,3.98
Russia,Premier League,2021/2022,05/12/2021,13:30,Dynamo Moscow,Ufa,2,0,H,1.73,3.53,5.94,1.73,3.74,6.5,1.67,3.54,5.72
Russia,Premier League,2021/2022,05/12/2021,13:30,Nizhny Novgorod,Rubin Kazan,2,1,H,3.44,3.09,2.42,3.62,3.4,2.42,3.28,3.15,2.29
Russia,Premier League,2021/2022,05/12/2021,16:00,Sochi,Krasnodar,1,2,A,2.39,3.68,2.95,2.57,3.95,3.25,2.33,3.54,2.88
Russia,Premier League,2021/2022,11/12/2021,11:00,FK Krylya Sovetov Samara,Rubin Kazan,2,0,H,1.93,3.56,4.31,2.1,3.84,4.4,1.91,3.46,4.02
Russia,Premier League,2021/2022,11/12/2021,13:30,CSKA Moscow,Arsenal Tula,2,0,H,1.55,4.08,7.06,1.58,4.25,7.21,1.53,3.94,6.51
Russia,Premier League,2021/2022,11/12/2021,16:00,FK Rostov,Ural,1,4,A,2.05,3.15,4.46,2.17,3.35,4.46,2.02,3.13,4.03
Russia,Premier League,2021/2022,12/12/2021,11:00,Dynamo Moscow,Zenit,1,1,D,3.27,3.38,2.35,3.44,3.61,2.38,3.11,3.36,2.26
Russia,Premier League,2021/2022,12/12/2021,13:30,Akhmat Grozny,Khimki,4,1,H,1.68,3.73,6.02,1.75,4.07,6.05,1.65,3.71,5.35
Russia,Premier League,2021/2022,12/12/2021,16:00,Krasnodar,Nizhny Novgorod,0,0,D,1.44,4.88,7.66,1.46,5.21,8.4,1.42,4.59,7.15
Russia,Premier League,2021/2022,12/12/2021,16:00,Lokomotiv Moscow,Ufa,2,0,H,2.19,3.27,3.76,2.25,3.42,4,2.14,3.17,3.57
Russia,Premier League,2021/2022,13/12/2021,16:00,Sochi,Spartak Moscow,3,0,H,2.11,3.66,3.54,2.23,3.88,3.62,2.06,3.56,3.42
`;

export type Team = string;
export type Score = {
  home: number;
  away: number;
};

type RawMatchData = {
  Country: string;
  League: string;
  Season: string;
  Date: string;
  Time: string;
  Home: string;
  Away: string;
  HG: string;
  AG: string;
  Res: string;
  PH: string;
  PD: string;
  PA: string;
  MaxH: string;
  MaxD: string;
  MaxA: string;
  AvgH: string;
  AvgD: string;
  AvgA: string;
};

export type MatchData = {
  season: string;
  date: Date;
  home: Team;
  away: Team;
  score: Score;
};

export const buildData = () => {
  const records: RawMatchData[] = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  });

  const strToDate = (str: string): Date => {
    const [day, month, year] = str.split("/", 3).map((x) => parseInt(x, 10));
    return new Date(year, month, day);
  };

  return records.map((r) => ({
    season: r.Season,
    date: strToDate(r.Date),
    home: r.Home as Team,
    away: r.Away as Team,
    score: {
      home: parseInt(r.HG, 10),
      away: parseInt(r.AG, 10),
    },
  }));
};
