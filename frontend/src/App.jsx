import { useState } from 'react';
import QuizForm from './components/QuizForm';
import QuestionItem from './components/QuestionItem';
import Results from './components/Results';
import Loading from './components/Loading';
import './App.css';
import axios from 'axios';

function App() {
  const [step, setStep] = useState('setup'); // setup, taking, results
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [lastConfig, setLastConfig] = useState(null);
  const [loading, setLoading] = useState(false);

  //2nd attempt works but messy and uses 2 functions
  // const generateQuestions = async (topic, num) => {

  //   // setLoading(true);
  //   // try{
  //   //   const response = await axios.get('http://localhost:8080/chat/genQue', {
  //   //     params: {
  //   //       n: num,
  //   //       q: topic
  //   //     }
  //   //   });
  //   //   const fetchedQuestions = response.data.questions.map((qText) => ({
  //   //     text: qText,
  //   //     // tip: `Reflect on your understanding of ${topic} to answer this.`
  //   //   }));
  //   //   setQuestions(fetchedQuestions);

  //   //   setStep('taking');
  //   //   setLoading(false);
  //   // }catch(error){
  //   //   console.error(error);
  //   //   setLoading(false);
  //   // }

  //   //default hard coded mock generation
  //   // const mockQuestions = Array.from({ length: num }, (_, i) => ({
  //   //   text: `What is a key concept of ${topic} related to point #${i + 1}?`,
  //   //   tip: `Focus on how ${topic} handles complexity in this specific area.`
  //   // }));
  //   // return mockQuestions;
  // };

  // // const handleStartQuiz = ({ topic, numQuestions }) => {
  // //   setLastConfig({ topic, numQuestions });
  // //   const generated = generateQuestions(topic, numQuestions);
  // //   setQuestions(generated);
  // //   setUserAnswers([]);
  // //   setCurrentQuestionIndex(0);
  // //   setStep('taking');
  // // };
  // const handleStartQuiz = ({ topic, numQuestions }) => {
  //   setLastConfig({ topic, numQuestions });
  //   setUserAnswers([]);
  //   setCurrentQuestionIndex(0);
  //   setStep('loading');
    
  //   // Just trigger the fetch; the fetch function will handle setting the state and step
  //   generateQuestions(topic, numQuestions);
  // };

  const handleStartQuiz = async ({ topic, numQuestions }) => {
    setLastConfig({ topic, numQuestions });
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setStep('loading');
    
    try {
      const response = await axios.get('http://localhost:8080/chat/genQue', {
        params: { n: numQuestions, q: topic }
      });

      // const fetchedQuestions = response.data.questions.map((qText) => ({
      //   text: qText,
      // }));

      const fetchedQuestions = response.data.questions;

      setQuestions(fetchedQuestions);
      console.log(fetchedQuestions);
      setStep('taking');
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setStep('setup'); // Kick back to form on error
      alert("Error loading quiz. Please try again.");
    }
    
  };

  const handleNextQuestion = (answer) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('results');
    }
  };

  const handleRestart = () => {
    setStep('setup');
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setLastConfig(null);
  };

  const handleRepeat = () => {
    setStep('setup');
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
  };

  return (
    <main>
      {step === 'setup' && (
        <QuizForm 
          key="setup-form"
          onSubmit={handleStartQuiz} 
          initialTopic={lastConfig?.topic || ''} 
          initialNumQuestions={lastConfig?.numQuestions || 5}
        />
      )}

      {step === 'loading' && (
        <Loading key="loading-screen" />
      )}

      {step === 'taking' && (
        <QuestionItem
          key={`question-${currentQuestionIndex}`}
          question={questions[currentQuestionIndex]}
          index={currentQuestionIndex}
          total={questions.length}
          onNext={handleNextQuestion}
        />
      )}

      {step === 'results' && (
        <Results
          questions={questions}
          userAnswers={userAnswers}
          onRestart={handleRestart}
          onRepeat={handleRepeat}
        />
      )}
    </main>
  );
}

export default App;
