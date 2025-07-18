import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Flashcards = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [currentDeck, setCurrentDeck] = useState('basic');

  const decks = {
    basic: {
      name: 'Базовые слова',
      cards: [
        { id: 1, word: 'Hello', translation: 'Привет', pronunciation: '/həˈloʊ/', difficulty: 'easy' },
        { id: 2, word: 'Thank you', translation: 'Спасибо', pronunciation: '/θæŋk juː/', difficulty: 'easy' },
        { id: 3, word: 'Beautiful', translation: 'Красивый', pronunciation: '/ˈbjuːtɪfəl/', difficulty: 'medium' },
        { id: 4, word: 'Understand', translation: 'Понимать', pronunciation: '/ˌʌndərˈstænd/', difficulty: 'medium' },
        { id: 5, word: 'Pronunciation', translation: 'Произношение', pronunciation: '/prəˌnʌnsiˈeɪʃən/', difficulty: 'hard' },
        { id: 6, word: 'Extraordinary', translation: 'Необычный', pronunciation: '/ɪkˈstrɔːrdəneri/', difficulty: 'hard' },
      ]
    },
    intermediate: {
      name: 'Средний уровень',
      cards: [
        { id: 7, word: 'Accomplish', translation: 'Достигать', pronunciation: '/əˈkʌmplɪʃ/', difficulty: 'medium' },
        { id: 8, word: 'Consideration', translation: 'Рассмотрение', pronunciation: '/kənˌsɪdəˈreɪʃən/', difficulty: 'hard' },
        { id: 9, word: 'Enthusiasm', translation: 'Энтузиазм', pronunciation: '/ɪnˈθuːziæzəm/', difficulty: 'medium' },
      ]
    }
  };

  const handleCardFlip = (cardId: number) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const currentCards = decks[currentDeck as keyof typeof decks].cards;

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
                <Button variant="ghost" className="text-blue-600 bg-blue-50">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Deck Selection */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Карточки для изучения</h1>
          <div className="flex space-x-4 mb-6">
            {Object.entries(decks).map(([key, deck]) => (
              <Button
                key={key}
                variant={currentDeck === key ? "default" : "outline"}
                onClick={() => setCurrentDeck(key)}
                className={currentDeck === key ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {deck.name}
              </Button>
            ))}
          </div>
          
          {/* Deck Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{decks[currentDeck as keyof typeof decks].name}</span>
                <Badge variant="outline">{currentCards.length} карточек</Badge>
              </CardTitle>
              <CardDescription>
                Прогресс изучения: 65% завершено
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={65} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Flashcards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCards.map((card) => (
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
                    <div className="flex items-center space-x-2 mb-4">
                      <div className={`w-3 h-3 rounded-full ${getDifficultyColor(card.difficulty)}`}></div>
                      <Badge variant="outline" className="text-xs">
                        {card.difficulty === 'easy' ? 'Легко' : card.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                      </Badge>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">{card.word}</h3>
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
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">{card.translation}</h3>
                    <Icon name="CheckCircle" className="h-12 w-12 text-green-500 mb-4" />
                    <p className="text-gray-600 text-center mb-4">
                      {card.word} - {card.translation}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                        <Icon name="ThumbsUp" className="h-4 w-4 mr-2" />
                        Знаю
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                        <Icon name="ThumbsDown" className="h-4 w-4 mr-2" />
                        Изучаю
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Study Controls */}
        <div className="mt-12 text-center">
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Icon name="Play" className="h-5 w-5 mr-2" />
              Начать изучение
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600">
              <Icon name="Shuffle" className="h-5 w-5 mr-2" />
              Перемешать карточки
            </Button>
            <Button size="lg" variant="outline" className="border-orange-600 text-orange-600">
              <Icon name="RotateCcw" className="h-5 w-5 mr-2" />
              Повторить сложные
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;