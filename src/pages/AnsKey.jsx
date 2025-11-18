import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import candidateData from "../model/candidate.json";
// import QUESTIONS from "../model/cdcc_bank.questions.json";
// import RESPONSE from "../model/Response.json";

export default function AnsKey() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const { enroll } = useParams();
  const [student, setStudent] = useState({});
  const [questionList, setQuestionList] = useState([])

  const graceQuestionId = ["1312", "1361", "1406", "668", "788", "549", "553", "577", "624", "744", "908"]

  const th = {
    textAlign: "left",
    padding: "8px 12px",
    background: "#f3f3f3",
    // border: "1px solid #ddd",
    border: "1px solid black",

    width: "200px"
  };

  const td = {
    padding: "8px 12px",
    // border: "1px solid #ddd"
    border: "1px solid black",

  };
  const optionPosition = {
    // position: "relative",
    // top: "-42px"
    display: "block ",
    position: "relative",
    alignItems: "center",
    marginRight: '4px',
    marginLeft: '4px',
    alignSelf: "center",
  };
  const optionDiv = {
    display: "flex",
    alignItems: "center",
    padding: '4px'
  }

  function getOptionLabel(index) {
    const labels = ['A', 'B', 'C', 'D'];
    return labels[index] || '';
  }


  const checkGraceQ = (qid) => {
    return graceQuestionId.includes(qid)
  }

  // useEffect(() => {

  //   // console.log(enroll); // <-- the value passed
  //   const token = localStorage.getItem('token')
  //   if (!token) return;
  //   let obtainedMarks = 0;
  //   let selectedOpt = 0;
  //   const STUDENTS = candidateData;
  //   const student = STUDENTS.find((s) => s.enroll === enroll);
  //   if (!student) return console.error("Student not found");

  //   const papershiftid = student.papershiftid;
  //   const filteredQuestions = QUESTIONS.filter(
  //     (q) => q.papershiftid == papershiftid
  //   );

  //   const studentResponses = RESPONSE.filter(
  //     (r) => r.enrollment == enroll && r.papershiftid == papershiftid
  //   );

  //   filteredQuestions.forEach((q) => {
  //     const response = studentResponses.find((r) => r.qid == q.q_id);
  //     if (response) {
  //       q.response = response.response;
  //       q.rstatus = response.rstatus;
  //       let isCorrectAnswer = false;
  //       q.options.map((opt) => {
  //         opt.selected = false;
  //         if (opt.opt_id == response.response) { opt.selected = true; selectedOpt++; }
  //         if (opt.opt_id == response.response && opt.iscorrect == true) {
  //           obtainedMarks += 1;
  //           isCorrectAnswer = true;
  //         }
  //       });
  //       // add grace only when NOT correct already
  //       if (!isCorrectAnswer && checkGraceQ(q.q_id)) {
  //         obtainedMarks += 1;
  //       }
  //     }
  //   });
  //   console.log("obtainedMarks", obtainedMarks);
  //   console.log("selectedOpt", selectedOpt);
  //   student.obtainedMarks = obtainedMarks
  //   student.selectedOpt = selectedOpt
  //   setStudent(student);
  //   setQuestionList(filteredQuestions);
  // }, [navigate])
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    async function loadData() {
      try {
        // Fetch all JSON files
        const resCandidate = await fetch('/cdcc-react-app/model/candidate.json');
        const candidateData = await resCandidate.json();

        const resQuestions = await fetch('/cdcc-react-app/model/cdcc_bank.questions.json');
        const QUESTIONS = await resQuestions.json();

        const resResponse = await fetch('/cdcc-react-app/model/Response.json');
        const RESPONSE = await resResponse.json();

        let obtainedMarks = 0;
        let selectedOpt = 0;

        const STUDENTS = candidateData;
        const student = STUDENTS.find((s) => s.enroll === enroll);
        if (!student) return console.error("Student not found");

        const papershiftid = student.papershiftid;

        const filteredQuestions = QUESTIONS.filter(
          (q) => q.papershiftid == papershiftid
        );

        const studentResponses = RESPONSE.filter(
          (r) => r.enrollment == enroll && r.papershiftid == papershiftid
        );

        filteredQuestions.forEach((q) => {
          const response = studentResponses.find((r) => r.qid == q.q_id);

          if (response) {
            q.response = response.response;
            q.rstatus = response.rstatus;

            let isCorrectAnswer = false;

            q.options.map((opt) => {
              opt.selected = false;

              if (opt.opt_id == response.response) {
                opt.selected = true;
                selectedOpt++;
              }

              if (opt.opt_id == response.response && opt.iscorrect == true) {
                obtainedMarks += 1;
                isCorrectAnswer = true;
              }
            });

            // Grace logic
            if (!isCorrectAnswer && checkGraceQ(q.q_id)) {
              obtainedMarks += 1;
            }
          }
        });

        console.log("obtainedMarks", obtainedMarks);
        console.log("selectedOpt", selectedOpt);

        student.obtainedMarks = obtainedMarks;
        student.selectedOpt = selectedOpt;

        setStudent(student);
        setQuestionList(filteredQuestions);

      } catch (error) {
        console.error("Error loading data", error);
      }
    }

    loadData();
  }, [navigate]);


  const downloadPDF = async () => {
    setLoading(true);
    try {
      //just print 
      window.print();
    } catch (err) {
      console.error("❌ html2canvas failed:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ maxWidth: 1000, margin: '24px auto', padding: '0 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img src="cdcclogo.png" alt="CDCC LOGO" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div className="">
          <h2 style={{ margin: 0 }}>Answer Key</h2>
        </div>
        <div className="">
          <button className="btn btn-primary d-flex align-self-center blue-color" onClick={() => downloadPDF()}>
            <span className="">Download</span>
          </button>
          {/* ✅ Add loader indicator below button */}
          {loading && (
            <div style={{ textAlign: "center", marginTop: 10 }}>
              ⏳ Generating PDF, please wait...
            </div>
          )}
        </div>
      </div>
      <div className="border">
        <div className="" style={{ border: "2px solid black", padding: "10px", margin: '5px' }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }} >
            <tbody>
              <tr>
                <th style={th}>Enrollment</th>
                <td style={td}>{student.enroll}</td>
              </tr>
              <tr>
                <th style={th}>Name</th>
                <td style={td}>{student.name}</td>
              </tr>
              <tr>
                <th style={th}>Post</th>
                <td style={td}>{student.post}</td>
              </tr>
              <tr>
                <th style={th}>Registration No.</th>
                <td style={td}>{student.regNo}</td>
              </tr>

              <tr>
                <th style={th}>Date of Birth</th>
                <td style={td}>{student.dob}</td>
              </tr>
              <tr>
                <th style={th}>Center Code</th>
                <td style={td}>{student.centerCode}</td>
              </tr>
              <tr>
                <th style={th}>Obtain Marks</th>
                <td style={td}>{student.obtainedMarks}</td>
              </tr>
              <tr>
                <th style={th}>Chosen options</th>
                <td style={td}>{student.selectedOpt}</td>
              </tr>
            </tbody>
          </table>
        </div>


        <div className="mb-2 mt-2 innerWrap" style={{ border: "2px solid black", padding: "2px", margin: '5px' }}>
          <h4 className="" style={{ textAlign: "center", fontWeight: "bold", marginTop: "2px" }}>For {student.post}</h4>

          <h5 className="text-left " style={{ textAlign: "left", margin: '0px', paddingLeft: "10px" }} >Notes:</h5>

          <ul style={{ marginTop: '0px', marginBottom: '0px' }}>
            <li style={{ fontSize: 'small' }}><span className='iscorrect'>Green border</span> means Correct Option</li>
            <li style={{ fontSize: 'small' }}><span className="material-symbols-outlined" style={{
              paddingTop: "4px", border: "2px solid blue",
              borderRadius: "6px", width: "16px", height: "16px",
              padding: "4px", position: "relative", top: "8px"
            }}>

              <img
                src="touch_app.svg"
                alt="Touch Icon"
                style={{ width: "16px", height: "16px", }}
              />
            </span> <span className="" style={{ position: "absolute", marginTop: "2px" }}>Means Chosen option</span></li>
          </ul>

          <div className="container-fluid box_card ">
            <div className="row mt-2 answerKeyBg ">
              <div className="col-12 scroll" id="qpackkdiv">
                {questionList?.map((question, i) => {
                  const qKey = `${question?.q_id || "q"}-${i}`;
                  const grace = checkGraceQ(question?.q_id);
                  const remarkText = ["668", "788"].includes(
                    String(question?.q_id || "")
                  )
                    ? "As the question or its options are doubtful, Grace mark for this question shall be given to all."
                    : "As the question or its options are incorrect, Grace mark for this question shall be given to all.";

                  return (
                    <div className="card mb-3 p-2" key={qKey}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex justify-content-between">
                                {/* <hr style={{ border: "3px solid brown" }} /> */}
                                <span className="qno">
                                  Q no. {i + 1} [{" "}
                                  <span className="rstatus">
                                    {question?.rstatus}
                                  </span>{" "}
                                  ]{" "}
                                  <span className="q_id">
                                    ( {question?.q_id} )
                                  </span>
                                </span>
                              </div>

                              {grace && (
                                <span className="remarksQ">Remark: {remarkText}</span>
                              )}
                              <br />
                              {question?.isReported && (
                                <span className="reportSpan">
                                  Report: {question?.report}
                                </span>
                              )}

                            </td>
                          </tr>


                          <tr>
                            <td>
                              <img
                                className="img-fluid img-bordered"
                                src={`/cdcc-react-app/uploads/questions/${question?.papershiftid}/${question?.q_id}.png`}
                                alt={`Question ${i + 1}`}
                              />
                            </td>
                          </tr>

                          {Array.isArray(question?.options) &&
                            question.options.map((option, j) => {
                              const optKey = `${qKey}-opt-${option?.opt_id || j}`;
                              const highlight =
                                option?.iscorrect || grace ? "iscorrect" : "border";
                              return (
                                <tr key={optKey}>
                                  <td>
                                    <div className="mb-1" style={optionDiv}>

                                      {option?.selected && (

                                        <span className="material-symbols-outlined" style={{
                                          paddingTop: "4px", border: "2px solid blue",
                                          borderRadius: "6px", width: "16px", height: "16px",
                                          padding: "4px", position: "relative", top: "8px"
                                        }}>

                                          <img
                                            src="touch_app.svg"
                                            alt="Touch Icon"
                                            style={{ width: "16px", height: "16px", position: "absolute" }}
                                          />

                                        </span>

                                      )}
                                      <span className="p-3" style={optionPosition} >
                                        {getOptionLabel(j)}
                                      </span>
                                      <img
                                        className={`img-fluid ${highlight}`}
                                        src={`/cdcc-react-app/uploads/options/${question?.papershiftid}/${option?.opt_id}.png`}
                                        alt={`Option ${getOptionLabel(j)}`}
                                      />
                                      <span></span>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


