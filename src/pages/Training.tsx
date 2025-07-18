import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Training = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const exercises = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'Как переводится слово "Beautiful"?',
      options: ['Красивый', 'Большой', 'Быстрый', 'Яркий'],
      correct: 'Красивый',
      pronunciation: '/ˈbjuːtɪfəl/'
    },
    {
      id: 2,
      type: 'translation',
      question: 'Переведите: "I understand you"',
      options: ['Я понимаю тебя', 'Я слышу тебя', 'Я вижу тебя', 'Я знаю тебя'],
      correct: 'Я понимаю тебя',
      pronunciation: '/aɪ ˌʌndərˈstænd juː/'
    },
    {
      id: 3,
      type: 'pronunciation',
      question: 'Выберите правильное произношение слова "Extraordinary"',
      options: ['/ɪkˈstrɔːrdəneri/', '/ɛkstraˈɔːrdəneri/', '/ˌɛkstrəˈɔːrdəneri/', '/ɪkˈstraɔːrdəneri/'],
      correct: '/ɪkˈstrɔːrdəneri/',
      word: 'Extraordinary'
    }
  ];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
  };

  const nextExercise = () => {
    setCurrentExercise((prev) => (prev + 1) % exercises.length);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const currentEx = exercises[currentExercise];
  const isCorrect = selectedAnswer === currentEx.correct;

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
              <Link to="/progress">
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                  <Icon name="TrendingUp" className="h-4 w-4 mr-2" />
                  Прогресс
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Тренировка</h1>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {currentExercise + 1} / {exercises.length}
            </Badge>
          </div>
          <Progress value={((currentExercise + 1) / exercises.length) * 100} className="h-3" />
        </div>

        {/* Exercise Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                {currentEx.type === 'multiple-choice' && 'Выберите правильный перевод'}
                {currentEx.type === 'translation' && 'Переведите предложение'}
                {currentEx.type === 'pronunciation' && 'Произношение'}
              </CardTitle>
              <Badge variant="secondary">
                {currentEx.type === 'multiple-choice' && 'Перевод'}
                {currentEx.type === 'translation' && 'Предложение'}
                {currentEx.type === 'pronunciation' && 'Фонетика'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentEx.question}
              </h2>
              {currentEx.pronunciation && (
                <div className="flex justify-center items-center space-x-4 mb-4">
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {currentEx.pronunciation}
                  </Badge>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Icon name="Volume2" className="h-4 w-4 mr-2" />
                    Прослушать
                  </Button>
                </div>
              )}
              {currentEx.word && (
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {currentEx.word}
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentEx.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  size="lg"
                  className={`h-auto p-6 text-left justify-start ${
                    isAnswered
                      ? option === currentEx.correct
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : selectedAnswer === option
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'opacity-50'
                      : selectedAnswer === option
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => !isAnswered && handleAnswerSelect(option)}
                  disabled={isAnswered}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isAnswered
                        ? option === currentEx.correct
                          ? 'bg-green-500 border-green-500'
                          : selectedAnswer === option
                          ? 'bg-red-500 border-red-500'
                          : 'border-gray-300'
                        : selectedAnswer === option
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {isAnswered && option === currentEx.correct && (
                        <Icon name="Check" className="h-4 w-4 text-white" />
                      )}
                      {isAnswered && selectedAnswer === option && option !== currentEx.correct && (
                        <Icon name="X" className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </Button>
              ))}
            </div>

            {/* Result Message */}
            {isAnswered && (
              <div className={`text-center p-6 rounded-lg mb-6 ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {isCorrect ? (
                    <Icon name="CheckCircle" className="h-8 w-8 text-green-600" />
                  ) : (
                    <Icon name="XCircle" className="h-8 w-8 text-red-600" />
                  )}
                  <span className={`text-xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Правильно!' : 'Неправильно'}
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-gray-700">
                    Правильный ответ: <span className="font-semibold">{currentEx.correct}</span>
                  </p>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-center">
              {isAnswered && (
                <Button size="lg" onClick={nextExercise} className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="ArrowRight" className="h-5 w-5 mr-2" />
                  Следующее упражнение
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Training Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Icon name="BookOpen" className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Изучение слов</CardTitle>
              <CardDescription>Основные слова и их переводы</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Icon name="MessageSquare" className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Предложения</CardTitle>
              <CardDescription>Перевод целых предложений</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Icon name="Volume2" className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Произношение</CardTitle>
              <CardDescription>Правильное произношение слов</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Training;