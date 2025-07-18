import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const flashcards = [
    { id: 1, word: 'Hello', translation: 'Привет', pronunciation: '/həˈloʊ/' },
    { id: 2, word: 'Learning', translation: 'Изучение', pronunciation: '/ˈlɜːrnɪŋ/' },
    { id: 3, word: 'Progress', translation: 'Прогресс', pronunciation: '/ˈprɑːɡres/' },
  ];

  const stats = [
    { label: 'Изучено слов', value: 247, color: 'bg-blue-500' },
    { label: 'Дней подряд', value: 15, color: 'bg-green-500' },
    { label: 'Точность', value: 89, color: 'bg-orange-500' },
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
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                <Icon name="Home" className="h-4 w-4 mr-2" />
                Главная
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                <Icon name="CreditCard" className="h-4 w-4 mr-2" />
                Карточки
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                <Icon name="Target" className="h-4 w-4 mr-2" />
                Тренировки
              </Button>
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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Изучайте английский с{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  интерактивными карточками
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Современная платформа для эффективного изучения английского языка 
                с произношением от носителей языка и персонализированными тренировками.
              </p>
              <div className="flex space-x-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Play" className="h-5 w-5 mr-2" />
                  Начать изучение
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Icon name="Volume2" className="h-5 w-5 mr-2" />
                  Послушать произношение
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/img/f85edd20-4e6b-4e91-890a-25e094cba15b.jpg" 
                alt="English Learning" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ваш прогресс в изучении
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {stat.value}{stat.label === 'Точность' ? '%' : ''}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {stat.label}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Progress 
                      value={stat.label === 'Точность' ? stat.value : (stat.value / 300) * 100} 
                      className="h-2"
                    />
                    <div className={`absolute top-0 left-0 h-2 ${stat.color} rounded-full transition-all duration-500`} 
                         style={{ width: `${stat.label === 'Точность' ? stat.value : (stat.value / 300) * 100}%` }}></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Flashcards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Интерактивные карточки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {flashcards.map((card) => (
              <div key={card.id} className="relative h-64 perspective-1000">
                <div 
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                    flippedCard === card.id ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => handleCardFlip(card.id)}
                >
                  {/* Front of card */}
                  <Card className="absolute w-full h-full backface-hidden border-2 border-blue-200 hover:border-blue-400 transition-colors">
                    <CardContent className="flex flex-col items-center justify-center h-full p-8">
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{card.word}</h3>
                      <Badge variant="outline" className="mb-4">
                        {card.pronunciation}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Audio pronunciation would go here
                        }}
                      >
                        <Icon name="Volume2" className="h-4 w-4 mr-2" />
                        Произношение
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* Back of card */}
                  <Card className="absolute w-full h-full backface-hidden rotate-y-180 border-2 border-green-200 hover:border-green-400 transition-colors">
                    <CardContent className="flex flex-col items-center justify-center h-full p-8">
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{card.translation}</h3>
                      <Icon name="CheckCircle" className="h-12 w-12 text-green-500 mb-4" />
                      <p className="text-gray-600 text-center">
                        Нажмите еще раз, чтобы вернуться к английскому слову
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Возможности платформы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="Brain" className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Адаптивное обучение</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Система автоматически подстраивается под ваш уровень знаний 
                  и скорость изучения материала.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="Volume2" className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Произношение носителей</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Слушайте правильное произношение каждого слова 
                  от носителей английского языка.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="Target" className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Персональные цели</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Устанавливайте собственные цели и отслеживайте 
                  прогресс в достижении результатов.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Начните изучение английского уже сегодня
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Присоединяйтесь к тысячам студентов, которые уже улучшили свой английский 
            с помощью нашей платформы.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
              <Icon name="Play" className="h-5 w-5 mr-2" />
              Начать бесплатно
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Icon name="Info" className="h-5 w-5 mr-2" />
              Узнать больше
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;