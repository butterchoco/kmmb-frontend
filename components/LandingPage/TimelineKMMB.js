import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Paper from "@material-ui/core/Paper";

const TimelineKMMB = () => {
  const timeline = [
    {
      date: "8 Agustus - 26 September 2020",
      description: "Pendaftaran",
    },
    {
      date: "10 Oktober 2020",
      description: "Deadline Pengumpulan Proposal dan Video",
    },
    {
      date: "12 Oktober - 24 Oktober 2020",
      description: "Penjurian",
    },
    {
      date: "26 Oktober 2020",
      description: "Pengumuman Finalis (10 Besar)",
    },
  ];
  const today = new Date();

  return (
    <div id="timelineLandingPage" className="timelineKMMB">
      <h2 className="timelineKMMB__title">Timeline Acara</h2>
      <Timeline align="alternate" className="timelineKMMB__timeline">
        {timeline.map((data, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot
                color="secondary"
                style={{
                  boxShadow: "none",
                  width: "16px",
                  height: "16px",
                  margin: "auto",
                }}
              />
              {index == timeline.length - 1 ? (
                <TimelineConnector
                  style={{
                    backgroundColor: "transparent",
                    border: "1px dashed #841361",
                    height: "96px",
                    width: 0,
                    marginBottom: "-10px",
                    marginTop: "-10px",
                  }}
                />
              ) : (
                <TimelineConnector
                  style={{
                    backgroundColor: "#841361",
                    height: "96px",
                    marginBottom: "-10px",
                    marginTop: "-10px",
                  }}
                />
              )}
              {index == timeline.length - 1 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "-40px",
                    position: "absolute",
                    transform: "translate(102px, 110px)",
                  }}
                >
                  <TimelineDot
                    color="secondary"
                    style={{
                      boxShadow: "none",
                      width: "24px",
                      height: "24px",
                      marginRight: "20px",
                      backgroundColor: "transparent",
                      border: "2px dashed #841361",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h4 style={{ color: "#841361", fontWeight: "bold" }}>+3</h4>
                  </TimelineDot>
                  <Paper
                    elevation={0}
                    style={{
                      backgroundColor: "white",
                      color: "#841361",
                      fontSize: "14px",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "5px 5px 5px 10px",
                      }}
                    >
                      Lihat 3 Acara lainnya <KeyboardArrowDown />
                    </p>
                  </Paper>
                </div>
              ) : null}
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                elevation={0}
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  padding: "0 10px",
                }}
              >
                <p
                  style={{
                    marginTop: "-5px",
                    marginBottom: "10px",
                  }}
                >
                  {data.date}
                </p>
                <h4 style={{ fontWeight: "bold" }}>{data.description}</h4>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default TimelineKMMB;
