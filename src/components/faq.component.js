import { MDBAccordion, MDBAccordionItem, MDBContainer } from "mdb-react-ui-kit";

export default function App() {
  return (
    <div style={{ marginTop: "130px" }}>
      <MDBContainer
        className="mt-5"
        style={{
          maxWidth: "1000px",
          background: "white",
          marginTop: "130px",
          borderRadius: "20px",
        }}
      >
        <MDBAccordion alwaysOpen initialActive={1}>
          <MDBAccordionItem
            collapseId={1}
            headerTitle="Is HireHub free to use?"
            style={{ textAlign: "left" }}
          >
            <strong style={{ textAlign: "left" }}>
              Yes, HireHub is completely free.
            </strong>{" "}
            HireHub is completely free for job seekers to use. Recruiters can
            create a free account to post job openings and review resumes, but
            there may be additional fees for premium features and services.
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={2}
            headerTitle="How does HireHub ensure the quality of job postings and candidates?"
            style={{ textAlign: "left" }}
          >
            {" "}
            HireHub has a team of experts who review job postings and candidates
            to ensure that they meet our quality standards. We also have
            features like candidate assessments and background checks to help
            recruiters evaluate candidates more effectively.
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={3}
            headerTitle="What type of jobs are available on HireHub?"
            style={{ textAlign: "left" }}
          >
            <strong>All kinds of jobs to be honest.</strong> HireHub has job
            listings in a wide variety of industries and job types, including
            full-time, part-time, contract, and freelance positions. Our
            platform also supports remote work opportunities.
          </MDBAccordionItem>
          <MDBAccordionItem
            collapseId={4}
            headerTitle="How do I contact HireHub if I have a question or issue?"
            style={{ textAlign: "left" }}
          >
            You can contact HireHub through our support email or live chat
            feature on our website. We also have a comprehensive help center
            with resources and FAQs to help you find answers to common
            questions.
          </MDBAccordionItem>
        </MDBAccordion>
      </MDBContainer>
    </div>
  );
}
