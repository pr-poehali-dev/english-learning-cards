import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { flashcardsData, generateRandomCard } from '@/data/flashcards';

const Index = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [cards, setCards] = useState(flashcardsData.slice(0, 6));
  const [dailyWords] = useState(flashcardsData.slice(0, 3));

  const generateNewCard = () => {
    const newCard = generateRandomCard();
    setCards(prev => [...prev.slice(1), newCard]);
  };

  const stats = [
    { label: 'Изучено слов', value: flashcardsData.filter(card => card.learned).length, color: 'bg-blue-500' },
    { label: 'Дней подряд', value: 15, color: 'bg-green-500' },
    { label: 'Точность', value: 89, color: 'bg-orange-500' },
    { label: 'Всего карточек', value: flashcardsData.length, color: 'bg-purple-500' },
  ];

  const handleCardFlip = (cardId: number) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="BookOpen" className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                EnglishLearner
              </span>
            </div>
            <nav className="flex space-x-8">
              <Link to="/">
                <Button variant="ghost" className="text-blue-600 bg-blue-50">
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
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                  <Icon name="Target" className="h-4 w-4 mr-2" />
                  Тренировки
                </Button>
              </Link>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                <Icon name="TrendingUp" className="h-4 w-4 mr-2" />
                Прогресс
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                <Icon name="BookOpen" className="h-4 w-4 mr-2" />
                Словарь
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                <Icon name="User" className="h-4 w-4 mr-2" />
                Профиль
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Изучайте английский с{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              умными карточками
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Эффективная система изучения с генерацией новых карточек и адаптивными тренировками
          </p>
        </section>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                    <Icon name="TrendingUp" className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((card) => (
            <Card 
              key={card.id} 
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                flippedCard === card.id ? 'bg-blue-50 border-blue-200' : 'hover:shadow-lg'
              }`}
              onClick={() => handleCardFlip(card.id)}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={card.level === 'beginner' ? 'secondary' : card.level === 'intermediate' ? 'default' : 'destructive'}>
                      {card.level}
                    </Badge>
                    <Badge variant="outline">{card.category}</Badge>
                  </div>
                  {flippedCard === card.id ? (
                    <>
                      <p className="text-2xl font-bold text-blue-600 mb-2">{card.translation}</p>
                      <p className="text-sm text-gray-600 mb-2">{card.pronunciation}</p>
                      <p className="text-sm italic text-gray-700">{card.example}</p>
                      <p className="text-xs text-gray-500 mt-1">{card.exampleTranslation}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-gray-800 mb-2">{card.word}</p>
                      <p className="text-sm text-gray-500">Нажмите для перевода</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Generate New Cards Button */}
        <div className="text-center mb-8">
          <Button onClick={generateNewCard} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            <Icon name="Plus" className="h-4 w-4 mr-2" />
            Сгенерировать новую карточку
          </Button>
        </div>

        {/* Daily Goals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Icon name="Target" className="h-5 w-5 mr-2" />
                Дневная цель
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700">Изучено слов</span>
                    <span className="text-sm font-medium text-blue-700">12/20</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700">Время занятий</span>
                    <span className="text-sm font-medium text-blue-700">25/30 мин</span>
                  </div>
                  <Progress value={83} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Icon name="Award" className="h-5 w-5 mr-2" />
                Достижения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      <Icon name="Star" className="h-3 w-3 mr-1" />
                      Новичок
                    </Badge>
                  </div>
                  <span className="text-sm text-green-700">100 слов</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                      <Icon name="Zap" className="h-3 w-3 mr-1" />
                      Скорость
                    </Badge>
                  </div>
                  <span className="text-sm text-green-700">5 дней подряд</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                      <Icon name="Brain" className="h-3 w-3 mr-1" />
                      Эрудит
                    </Badge>
                  </div>
                  <span className="text-sm text-green-700">90% точность</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Today's Words */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Calendar" className="h-5 w-5 mr-2" />
              Слова дня
            </CardTitle>
            <CardDescription>
              Сегодня рекомендуем изучить эти слова
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dailyWords.map((word) => (
                <div key={word.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{word.category}</Badge>
                    <Badge variant={word.level === 'beginner' ? 'secondary' : word.level === 'intermediate' ? 'default' : 'destructive'}>
                      {word.level}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg">{word.word}</h3>
                  <p className="text-gray-600 text-sm">{word.translation}</p>
                  <p className="text-gray-500 text-xs mt-1">{word.pronunciation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Icon name="Play" className="h-5 w-5 mr-2" />
                Быстрая тренировка
              </CardTitle>
              <CardDescription>
                Проведите 5-минутную тренировку с карточками
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/training">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Icon name="Zap" className="h-4 w-4 mr-2" />
                  Начать тренировку
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Icon name="CreditCard" className="h-5 w-5 mr-2" />
                Изучить карточки
              </CardTitle>
              <CardDescription>
                Просмотрите все доступные карточки по категориям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/flashcards">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Icon name="BookOpen" className="h-4 w-4 mr-2" />
                  Открыть карточки
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;