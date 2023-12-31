import { Form, Radio,Button,Steps } from 'antd';
import { useState } from 'react';
const { Step } = Steps;

const AccountOpeningForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleSubmit = () => {
    alert('submit')
  }

  return (
    <Form>
      <Steps current={currentStep}>
        <Step title="Start Risk Assesment"/>
        <Step title="Account Opening Procedure" />
        <Step title="Account Closing Procedure" />
        <Step title="Cash at vault as Heading"/>
      </Steps>
      <br />
      {currentStep === 0 && (
       <p>
        Risk Assessment tool - Operational Risk Management

Introduction

The purpose of the Risk assessment is providing the bank insight in the level of Operational Risk Management in branches in an relatively easy way. The outcome of this risk assessment tool is indicative. Besides this, it would help the ORM-function to set priorities towards improvement and can be used to show improvements overtime. 

Approach
The first step is to fill in the  General Information tab. 

Thereafter you can fill in the green tabs. Each tab covers a specific topic of Operational Risk Management consisting of several elements.  All related items per element should be scored on the scale 'Not comply' to 'Fully comply' or 'Don't know' by setting a 'x' in the right cell. After scoring an item, you will get a green sign. In case you missed an item or mistakenly provide more scores for the same item, the sign stays orange. 

In the tab “scores”, weightage is given for each element of Operational Risk Management based on the severity of risk in each element and result is presented using weightage average score.

In the tab Assessment Summary the overall outcome per topic are presented based on all the scores. To do so all scores are translated into an % for improvent on a scale of 0 - 100%. A high percentage indicates more room for improvement which also indicates more risk and vice versa. The outcomes are also visualized by graphs.

The outcomes in each topic are then multiplied by the weightage given to each topics and final risk ranking is done based on weightage average score.

If any topic in the tool is not applicable to any branch, score shall be given as “Fully comply” and Percentage of improvement shall be 0.

The tab “Digitization of Documents” is incorporated in the Risk assessment tool however is not linked to the final assessment report. The same shall be linked to final report going further when required.

Other Checklist Tab: Checklist that shall not deduct the marks of branch i.e., which are not in control of branch but branch faces risk due to non-compliance.

Notes:
1. In case of any non compliance of requirement by "Nepal Rastra Bank", Scaling shall be given as "Not Comply" irrespective of the result as per sample taken.

2. In case of any non compliance of Bank's "Internal Policy/Guideline/Circular etc", Scaling can be lowered depending upon the severity of non compliance and risk faced by bank, if required.

       </p>
      )
      }
      {currentStep === 1 && (
        <>
          <h3>Observation as per manual/circulars/NRB Directives</h3>
          <Form.Item>
            Obtained complete documents while account opening as per Operations manual point no. 1.2.2 & KYC guidelines.
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Account opening form completed with introducer's signature duly verified by CSD. (Operation Manual 1.2.1)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            The field of Estimated annual turnover/income mentioned or declared in KYC form (Operation Manual 1.2.2)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Risk Categorized in opened accounts as per AML/CFT Policy of the Bank/NRB Circular (Operation Manual 1.2.2)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Approval obtained from COO or designated prior to opening High risk graded accounts as per AML/CFT policy chapter 4.1.1
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Photocopy of citizenship of all family members [i.e. unseparated family members] obtained of those customers falling under high risk category as per AMLCFT policy or whose Enhanced CDD has to be conducted. In case of minors, birth certificate or identification card is to be obtained. (Operation Manual 1.2.2)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Multiple individual accounts of same nature are not maintained by branch. (Unified Directive 21/078, Point no 45)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      )}
      {currentStep === 2 && (
        <>
          <h3>Observation as per manual/circulars/NRB Directives</h3>
          <Form.Item>
            Clearance from all department of branch (i.e TAD, CAD, Finance, Locker, Card, E-banking/Mobile banking) is obtained.(Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            System printed cheque inventory, if any, attached in account closing file with printed statement after account closure.(Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Remaining valid cheques/ATM card if issued has been returned by the customer at the time of account close.(Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            “Account Closed” stamp affixed on the face of the Account Closing Request Form/Letter and Account Opening Form after closure. (Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      )}
      {currentStep === 3 && (
        <>
          <h3>Observation as per manual/circulars/NRB Directives</h3>
          <Form.Item>
            Clearance from all department of branch (i.e TAD, CAD, Finance, Locker, Card, E-banking/Mobile banking) is obtained.(Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            System printed cheque inventory, if any, attached in account closing file with printed statement after account closure.(Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Remaining valid cheques/ATM card if issued has been returned by the customer at the time of account close.(Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            “Account Closed” stamp affixed on the face of the Account Closing Request Form/Letter and Account Opening Form after closure. (Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {currentStep > 0 && (
          <Button type="primary" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {currentStep < 3 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep === 3 && (
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default AccountOpeningForm;