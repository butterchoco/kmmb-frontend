import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const TimelineKMMB = () => {
  const timeline = [
    {
      date: "20 Maret 2020",
      description: "Pendaftaran Peserta",
    },
    {
      date: "20 Maret 2020",
      description: "Pendaftaran Peserta",
    },
  ];

  return (
    <div className="timelineKMMB">
      <h2 className="timelineKMMB__title">Timeline Acara</h2>
      <Timeline align="alternate">
        {timeline.map((data, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography color="textSecondary">{data.date}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={2} style={{ padding: "10px" }}>
                <Typography>{data.description}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default TimelineKMMB;
