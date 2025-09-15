import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Play, 
  Pause, 
  Square, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Users,
  Building2,
  Target,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Matchmaking = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [matchesFound, setMatchesFound] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [realTimeStats, setRealTimeStats] = useState({
    studentsProcessed: 0,
    internshipsMatched: 0,
    currentScore: 0,
    iterations: 0
  });

  const phases = [
    { id: 'preprocessing', name: 'Data Preprocessing', duration: 15, description: 'Cleaning and validating input data' },
    { id: 'scoring', name: 'Score Calculation', duration: 25, description: 'Computing match scores for all pairs' },
    { id: 'optimization', name: 'Algorithm Optimization', duration: 35, description: 'Running Hungarian algorithm for optimal matching' },
    { id: 'policy', name: 'Policy Application', duration: 15, description: 'Applying affirmative action rules' },
    { id: 'validation', name: 'Results Validation', duration: 10, description: 'Final validation and quality checks' }
  ];

  const performanceData = [
    { iteration: 1, score: 72, matches: 1200 },
    { iteration: 2, score: 78, matches: 2100 },
    { iteration: 3, score: 83, matches: 3100 },
    { iteration: 4, score: 86, matches: 4200 },
    { iteration: 5, score: 89, matches: 5200 },
    { iteration: 6, score: 91, matches: 6100 },
    { iteration: 7, score: 93, matches: 6800 },
    { iteration: 8, score: 94, matches: 7200 },
    { iteration: 9, score: 95, matches: 7500 },
    { iteration: 10, score: 96, matches: 7800 }
  ];

  const scoreDistribution = [
    { range: '90-100%', count: 3200, percentage: 41 },
    { range: '80-89%', count: 2800, percentage: 36 },
    { range: '70-79%', count: 1200, percentage: 15 },
    { range: '60-69%', count: 600, percentage: 8 }
  ];

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
        
        setProgress(prev => {
          const newProgress = Math.min(prev + Math.random() * 2, 100);
          
          const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);
          let currentDuration = 0;
          let currentPhaseName = '';
          
          for (const phase of phases) {
            currentDuration += phase.duration;
            if ((newProgress / 100) * totalDuration <= currentDuration) {
              currentPhaseName = phase.name;
              break;
            }
          }
          
          setCurrentPhase(currentPhaseName);
          
          setRealTimeStats(prev => ({
            studentsProcessed: Math.min(48250, prev.studentsProcessed + Math.floor(Math.random() * 50)),
            internshipsMatched: Math.min(4875, prev.internshipsMatched + Math.floor(Math.random() * 5)),
            currentScore: Math.min(98, prev.currentScore + Math.random() * 0.5),
            iterations: prev.iterations + 1
          }));
          
          setMatchesFound(Math.floor((newProgress / 100) * 7800));
          setAvgScore(Math.min(96, 70 + (newProgress / 100) * 26));
          
          return newProgress;
        });
        
        if (progress >= 99.9) {
          setIsRunning(false);
          setCurrentPhase('Complete');
          setProgress(100);
        }
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, isPaused, progress]);

  const startMatchmaking = () => {
    setIsRunning(true);
    setIsPaused(false);
    setProgress(0);
    setElapsedTime(0);
    setMatchesFound(0);
    setAvgScore(0);
    setRealTimeStats({
      studentsProcessed: 0,
      internshipsMatched: 0,
      currentScore: 0,
      iterations: 0
    });
  };

  const pauseMatchmaking = () => {
    setIsPaused(!isPaused);
  };

  const stopMatchmaking = () => {
    setIsRunning(false);
    setIsPaused(false);
    setProgress(0);
    setCurrentPhase('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold text-gray-900">AI Matchmaking Engine</h1>
        <p className="text-gray-600 mt-2">
          Run the intelligent matching algorithm to allocate students to internship opportunities
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Matchmaking Engine</h2>
              <p className="text-gray-600">Configure and run the allocation algorithm</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {!isRunning ? (
              <button
                onClick={startMatchmaking}
                className="flex items-center px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Matching
              </button>
            ) : (
              <>
                <button
                  onClick={pauseMatchmaking}
                  className="flex items-center px-4 py-2 bg-yellow-600 text-white hover:bg-yellow-700 rounded-lg transition-colors"
                >
                  {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button
                  onClick={stopMatchmaking}
                  className="flex items-center px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </button>
              </>
            )}
          </div>
        </div>

        {isRunning && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Progress</h3>
                <p className="text-sm text-gray-600">{currentPhase}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</p>
                <p className="text-sm text-gray-500">{formatTime(elapsedTime)}</p>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {isRunning && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Students Processed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {realTimeStats.studentsProcessed.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Internships Matched</p>
                <p className="text-2xl font-bold text-gray-900">
                  {realTimeStats.internshipsMatched.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Current Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {realTimeStats.currentScore.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Iterations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {realTimeStats.iterations}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Algorithm Phases</h3>
        <div className="space-y-4">
          {phases.map((phase, index) => {
            const phaseProgress = Math.max(0, Math.min(100, (progress - (index * 20)) * 5));
            const isActive = currentPhase === phase.name;
            const isCompleted = progress > (index + 1) * 20;
            
            return (
              <div key={phase.id} className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-green-100 text-green-600' 
                    : isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium ${
                      isActive ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-gray-600'
                    }`}>
                      {phase.name}
                    </h4>
                    <span className="text-sm text-gray-500">{phase.duration}s</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
                  
                  {isActive && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${phaseProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Algorithm Convergence</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="iteration" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">
            Shows how the average match score improves with each iteration
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip formatter={(value) => [value.toLocaleString(), 'Matches']} />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">
            Distribution of match scores across all allocations
          </p>
        </div>
      </div>

      {progress === 100 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 slide-up">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <h3 className="text-xl font-semibold text-green-900">Matching Complete!</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{matchesFound.toLocaleString()}</p>
              <p className="text-green-800">Successful Matches</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{avgScore.toFixed(1)}%</p>
              <p className="text-green-800">Average Match Score</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{formatTime(elapsedTime)}</p>
              <p className="text-green-800">Processing Time</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors font-medium">
              View Detailed Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matchmaking;