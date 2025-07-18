import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { flashcardsData, Flashcard } from '@/data/flashcards';

type ExerciseType = 'translation' | 'choice' | 'typing' | 'listening';

interface Exercise {
  id: number;
  type: ExerciseType;
  question: string;
  answer: string;
  options: string[];
  word: Flashcard;
}

const Training = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const generateExercises = () => {
    const shuffledCards = [...flashcardsData].sort(() => Math.random() - 0.5).slice(0, 10);
    const exerciseTypes: ExerciseType[] = ['translation', 'choice', 'typing', 'listening'];
    
    const newExercises: Exercise[] = shuffledCards.map((card, index) => {
      const type = exerciseTypes[index % exerciseTypes.length];
      
      const wrongOptions = flashcardsData
        .filter(c => c.id !== card.id && c.category === card.category)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(c => c.translation);
      
      const allOptions = [card.translation, ...wrongOptions].sort(() => Math.random() - 0.5);
      
      switch (type) {
        case 'translation':
          return {
            id: index + 1,
            type,
            question: `Переведите слово: "${card.word}"`,
            answer: card.translation,
            options: allOptions,
            word: card
          };
        case 'choice':
          return {
            id: index + 1,
            type,
            question: `Выберите правильный перевод для "${card.word}"`,
            answer: card.translation,
            options: allOptions,
            word: card
          };
        case 'typing':
          return {
            id: index + 1,
            type,
            question: `Напишите английское слово для "${card.translation}"`,
            answer: card.word.toLowerCase(),
            options: [],
            word: card
          };
        case 'listening':
          return {
            id: index + 1,
            type,
            question: `Выберите правильный перевод для произносимого слова`,
            answer: card.translation,
            options: allOptions,
            word: card
          };
        default:
          return {
            id: index + 1,
            type: 'translation',
            question: `Переведите слово: "${card.word}"`,
            answer: card.translation,
            options: allOptions,
            word: card
          };
      }
    });
    
    setExercises(newExercises);
  };

  useEffect(() => {
    generateExercises();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const handleSubmit = () => {
    setIsTimerActive(false);
    
    if (exercises.length === 0) return;
    
    const currentEx = exercises[currentExercise];
    const correct = currentEx.type === 'typing' 
      ? userAnswer.toLowerCase().trim() === currentEx.answer.toLowerCase() 
      : selectedAnswer === currentEx.answer;
    
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    setTimeout(() => {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setUserAnswer('');
        setSelectedAnswer('');
        setShowResult(false);
        setTimeLeft(30);
        setIsTimerActive(true);
      } else {
        alert(`Тренировка завершена! Ваш результат: ${score + (correct ? 1 : 0)}/${exercises.length}`);
      }
    }, 2000);
  };

  const startTraining = () => {
    setCurrentExercise(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(30);
    setIsTimerActive(true);
    generateExercises();
  };

  const handleSkip = () => {
    setIsTimerActive(false);
    setShowResult(true);
    setIsCorrect(false);
    
    setTimeout(() => {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setUserAnswer('');
        setSelectedAnswer('');
        setShowResult(false);
        setTimeLeft(30);
        setIsTimerActive(true);
      } else {
        alert(`Тренировка завершена! Ваш результат: ${score}/${exercises.length}`);
      }
    }, 1000);
  };

  if (exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Загрузка тренировки...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const currentEx = exercises[currentExercise];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <Icon name="BookOpen" className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  EnglishLearner
                </span>
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link to="/">
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                  <Icon name="Home" className="h-4 w-4 mr-2" />
                  Главная
                </Button>
              </Link>
              <Link to="/flashcards">
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                  <Icon name="CreditCard" className="h-4 w-4 mr-2" />
                  Карточки
                </Button>
              </Link>
              <Link to="/training">
                <Button variant="ghost" className="text-blue-600 bg-blue-50">
                  <Icon name="Target" className="h-4 w-4 mr-2" />
                  Тренировки
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Тренировка</h1>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-4 py-2">
                Счет: {score}/{exercises.length}
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                {currentExercise + 1} из {exercises.length}
              </Badge>
              <Badge variant={timeLeft > 10 ? "default" : "destructive"} className="px-4 py-2">
                <Icon name="Timer" className="h-4 w-4 mr-1" />
                {timeLeft}с
              </Badge>
            </div>
          </div>
          <Progress value={((currentExercise + 1) / exercises.length) * 100} className="h-2" />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon name="Target" className="h-5 w-5 mr-2" />
                Упражнение {currentExercise + 1}
              </div>
              <Badge variant={currentEx.word.level === 'beginner' ? 'secondary' : currentEx.word.level === 'intermediate' ? 'default' : 'destructive'}>
                {currentEx.word.level}
              </Badge>
            </CardTitle>
            <CardDescription>
              Тип: {currentEx.type === 'translation' ? 'Перевод' : currentEx.type === 'choice' ? 'Выбор варианта' : currentEx.type === 'typing' ? 'Ввод текста' : 'Аудирование'} | Категория: {currentEx.word.category}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentEx.question}</h2>
                {currentEx.type === 'listening' && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => {
                      console.log('Playing audio for:', currentEx.word.word);
                    }}
                    className="mb-4"
                  >
                    <Icon name="Volume2" className="h-5 w-5 mr-2" />
                    Прослушать слово
                  </Button>
                )}
              </div>

              {currentEx.type === 'typing' ? (
                <div className="max-w-md mx-auto">
                  <Input
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Введите ваш ответ"
                    className="text-lg p-4 text-center"
                    disabled={showResult}
                  />
                </div>
              ) : (
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={showResult}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentEx.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label 
                          htmlFor={`option-${index}`} 
                          className="flex-1 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {showResult && (
                <div className={`text-center p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <Icon name={isCorrect ? "CheckCircle" : "XCircle"} className={`h-8 w-8 ${isCorrect ? 'text-green-600' : 'text-red-600'} mx-auto mb-2`} />
                  <p className={`${isCorrect ? 'text-green-800' : 'text-red-800'} font-medium mb-2`}>
                    {isCorrect ? 'Правильно!' : `Неправильно! Правильный ответ: ${currentEx.answer}`}
                  </p>
                  {!isCorrect && (
                    <div className="text-sm text-gray-600">
                      <p><strong>Пример:</strong> {currentEx.word.example}</p>
                      <p><strong>Перевод:</strong> {currentEx.word.exampleTranslation}</p>
                    </div>
                  )}
                </div>
              )}

              {!showResult && (
                <div className="flex justify-center space-x-4">
                  <Button onClick={handleSubmit} className="px-8" disabled={!userAnswer && !selectedAnswer}>
                    <Icon name="Send" className="h-4 w-4 mr-2" />
                    Ответить
                  </Button>
                  <Button variant="outline" onClick={handleSkip}>
                    <Icon name="SkipForward" className="h-4 w-4 mr-2" />
                    Пропустить
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Training Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="RotateCcw" className="h-5 w-5 mr-2" />
                Новая тренировка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Начните новую тренировку со случайными словами</p>
              <Button className="w-full" onClick={startTraining}>
                <Icon name="Play" className="h-4 w-4 mr-2" />
                Начать заново
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="BarChart3" className="h-5 w-5 mr-2" />
                Статистика
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Текущий результат: {score}/{exercises.length}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Точность:</span>
                  <span>{exercises.length > 0 ? Math.round((score / exercises.length) * 100) : 0}%</span>
                </div>
                <Progress value={exercises.length > 0 ? (score / exercises.length) * 100 : 0} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exercise Types */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Icon name="Languages" className="h-4 w-4 mr-2" />
                Перевод
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">Переводите слова с английского на русский</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Icon name="CheckSquare" className="h-4 w-4 mr-2" />
                Выбор
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">Выберите правильный вариант из предложенных</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Icon name="Keyboard" className="h-4 w-4 mr-2" />
                Ввод
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">Напишите английское слово</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Icon name="Volume2" className="h-4 w-4 mr-2" />
                Аудио
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">Определите слово по произношению</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm">
        <p className="flex items-center">
          <Icon name="Keyboard" className="h-4 w-4 mr-2" />
          Enter - Ответить | Esc - Пропустить
        </p>
      </div>
    </div>
  );
};

export default Training;