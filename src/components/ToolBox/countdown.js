import { Grid } from "@material-ui/core";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time / 1000) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function CountDownComponent(props) {
  const startTime = props.startTime ? props.startTime : Date.now() / 1000;
  const endTime = props.endTime
    ? props.endTime
    : Date.now() / 1000 + 24 * 60 * 60;

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;
  debugger;
  return (
    <div className="App">
      <Grid container spacing={2} direction="row">
        <Grid item>
          <CountdownCircleTimer
            {...timerProps}
            colors={[["#7E2E84"]]}
            duration={daysDuration}
            initialRemainingTime={remainingTime}
          >
            {({ elapsedTime }) =>
              renderTime("gün", getTimeDays(daysDuration - elapsedTime / 1000))
            }
          </CountdownCircleTimer>
        </Grid>
        <Grid item>
          <CountdownCircleTimer
            {...timerProps}
            colors={[["#D14081"]]}
            duration={daySeconds}
            initialRemainingTime={remainingTime % daySeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > hourSeconds,
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("saat", getTimeHours(daySeconds - elapsedTime / 1000))
            }
          </CountdownCircleTimer>
        </Grid>
        <Grid item>
          <CountdownCircleTimer
            {...timerProps}
            colors={[["#EF798A"]]}
            duration={hourSeconds}
            initialRemainingTime={remainingTime % hourSeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > minuteSeconds,
            ]}
          >
            {({ elapsedTime }) =>
              renderTime(
                "dakika",
                getTimeMinutes(hourSeconds - elapsedTime / 1000)
              )
            }
          </CountdownCircleTimer>
        </Grid>
        <Grid item>
          <CountdownCircleTimer
            {...timerProps}
            colors={[["#218380"]]}
            duration={minuteSeconds}
            initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > 0,
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("saniye", getTimeSeconds(elapsedTime))
            }
          </CountdownCircleTimer>
        </Grid>
      </Grid>
    </div>
  );
}
