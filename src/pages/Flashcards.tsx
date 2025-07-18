import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { flashcardsData, categories, levels, generateRandomCard } from '@/data/flashcards';

const Flashcards = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState(flashcardsData);

  const filteredCards = cards.filter(card => {
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || card.level === selectedLevel;
    const matchesSearch = card.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.translation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const handleCardFlip = (cardId: number) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  const toggleLearned = (cardId: number) => {
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, learned: !card.learned } : card
    ));
  };

  const addRandomCard = () => {
    const newCard = generateRandomCard();
    setCards(prev => [...prev, newCard]);
  };

  const shuffleCards = () => {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const getLearnedCount = () => {
    return filteredCards.filter(card => card.learned).length;
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

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
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header and Controls */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Карточки для изучения</h1>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Поиск</label>
              <Input
                placeholder="Найти слово..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Уровень</label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите уровень" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все уровни</SelectItem>
                  <SelectItem value="beginner">Начальный</SelectItem>
                  <SelectItem value="intermediate">Средний</SelectItem>
                  <SelectItem value="advanced">Продвинутый</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Действия</label>
              <div className="flex space-x-2">
                <Button onClick={addRandomCard} size="sm" className="flex-1">
                  <Icon name="Plus" className="h-4 w-4 mr-1" />
                  Добавить
                </Button>
                <Button onClick={shuffleCards} size="sm" variant="outline" className="flex-1">
                  <Icon name="Shuffle" className="h-4 w-4 mr-1" />
                  Перемешать
                </Button>
              </div>
            </div>
          </div>
          
          {/* Progress Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Прогресс изучения</span>
                <div className="flex space-x-2">
                  <Badge variant="outline">{filteredCards.length} карточек</Badge>
                  <Badge variant="secondary">{getLearnedCount()} изучено</Badge>
                </div>
              </CardTitle>
              <CardDescription>
                Категория: {selectedCategory} | Уровень: {selectedLevel}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Изучено</span>
                  <span>{getLearnedCount()} / {filteredCards.length}</span>
                </div>
                <Progress 
                  value={filteredCards.length > 0 ? (getLearnedCount() / filteredCards.length) * 100 : 0} 
                  className="h-2" 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flashcards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div key={card.id} className="relative h-64 perspective-1000">
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                  flippedCard === card.id ? 'rotate-y-180' : ''
                }`}
                onClick={() => handleCardFlip(card.id)}
              >
                {/* Front of card */}
                <Card className={`absolute w-full h-full backface-hidden border-2 transition-colors ${
                  card.learned ? 'border-green-200 bg-green-50' : 'border-blue-200 hover:border-blue-400'
                }`}>
                  <CardContent className="flex flex-col items-center justify-center h-full p-6">
                    <div className="flex items-center justify-between w-full mb-2">
                      <Badge variant="outline" className="text-xs">
                        {card.category}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getDifficultyColor(card.level)}`}></div>
                        <Badge variant={card.level === 'beginner' ? 'secondary' : card.level === 'intermediate' ? 'default' : 'destructive'} className="text-xs">
                          {card.level}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{card.word}</h3>
                    <Badge variant="outline" className="mb-3 text-xs">
                      {card.pronunciation}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Playing audio for:', card.word);
                        }}
                      >
                        <Icon name="Volume2" className="h-4 w-4 mr-2" />
                        Слушать
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className={card.learned ? 'text-green-600 border-green-600' : 'text-gray-600 border-gray-600'}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLearned(card.id);
                        }}
                      >
                        <Icon name={card.learned ? "CheckCircle" : "Circle"} className="h-4 w-4 mr-2" />
                        {card.learned ? 'Знаю' : 'Изучаю'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Back of card */}
                <Card className={`absolute w-full h-full backface-hidden rotate-y-180 border-2 transition-colors ${
                  card.learned ? 'border-green-200 bg-green-50' : 'border-green-200 hover:border-green-400'
                }`}>
                  <CardContent className="flex flex-col items-center justify-center h-full p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{card.translation}</h3>
                    <div className="mb-4 text-center">
                      <p className="text-sm text-gray-600 mb-2 italic">"{card.example}"</p>
                      <p className="text-xs text-gray-500">"{card.exampleTranslation}"</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className={card.learned ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLearned(card.id);
                        }}
                      >
                        <Icon name={card.learned ? "CheckCircle" : "ThumbsUp"} className="h-4 w-4 mr-2" />
                        {card.learned ? 'Изучено' : 'Знаю'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-orange-600 border-orange-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Adding to practice:', card.word);
                        }}
                      >
                        <Icon name="RefreshCw" className="h-4 w-4 mr-2" />
                        Повторить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Карточки не найдены</h3>
            <p className="text-gray-600 mb-4">Попробуйте изменить фильтры или добавить новые карточки</p>
            <Button onClick={addRandomCard} className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Plus" className="h-4 w-4 mr-2" />
              Добавить случайную карточку
            </Button>
          </div>
        )}

        {/* Study Controls */}
        {filteredCards.length > 0 && (
          <div className="mt-12 text-center">
            <div className="flex justify-center space-x-4">
              <Link to="/training">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Icon name="Play" className="h-5 w-5 mr-2" />
                  Начать тренировку
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600" onClick={shuffleCards}>
                <Icon name="Shuffle" className="h-5 w-5 mr-2" />
                Перемешать карточки
              </Button>
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-600">
                <Icon name="RotateCcw" className="h-5 w-5 mr-2" />
                Повторить неизученные
              </Button>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего карточек</p>
                  <p className="text-2xl font-bold text-gray-900">{cards.length}</p>
                </div>
                <Icon name="CreditCard" className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Изучено</p>
                  <p className="text-2xl font-bold text-gray-900">{cards.filter(c => c.learned).length}</p>
                </div>
                <Icon name="CheckCircle" className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Прогресс</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {cards.length > 0 ? Math.round((cards.filter(c => c.learned).length / cards.length) * 100) : 0}%
                  </p>
                </div>
                <Icon name="TrendingUp" className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;