import React, { useState } from 'react';
import { 
  Calculator, 
  Play, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown,
  Users,
  MapPin,
  Award,
  Target,
  BarChart3,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const WhatIfSimulator = () => {
  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      name: 'Current Scenario',
      parameters: {
        ruralQuota: 25,
        socialInclusionQuota: 30,
        skillWeight: 35,
        locationWeight: 20,
        minimumMatchScore: 60
      },
      results: {
        totalMatches: 7800,
        avgScore: 87.3,
        ruralRepresentation: 24.5,
        socialInclusion: 31.2,
        unallocatedStudents: 6070
      },
      isActive: true
    }
  ]);

  const [currentScenario, setCurrentScenario] = useState({
    ruralQuota: 25,
    socialInclusionQuota: 30,
    skillWeight: 35,
    locationWeight: 20,
    minimumMatchScore: 60
  });

  const [simulationResults, setSimulationResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    
    setTimeout(() => {
      const results = {
        totalMatches: Math.floor(7800 + (Math.random() - 0.5) * 1000),
        avgScore: Math.max(70, Math.min(95, 87.3 + (Math.random() - 0.5) * 10)),
        ruralRepresentation: Math.max(15, Math.min(40, 24.5 + (Math.random() - 0.5) * 10)),
        socialInclusion: Math.max(20, Math.min(45, 31.2 + (Math.random() - 0.5) * 10)),
        unallocatedStudents: Math.max(3000, Math.min(8000, 6070 + (Math.random() - 0.5) * 1000)),
        sectorDistribution: [
          { name: 'IT', current: 35, new: 35 + (Math.random() - 0.5) * 5 },
          { name: 'Finance', current: 18, new: 18 + (Math.random() - 0.5) * 3 },
          { name: 'Manufacturing', current: 15, new: 15 + (Math.random() - 0.5) * 3 },
          { name: 'Healthcare', current: 12, new: 12 + (Math.random() - 0.5) * 2 },
          { name: 'Education', current: 8, new: 8 + (Math.random() - 0.5) * 2 },
          { name: 'Other', current: 12, new: 12 + (Math.random() - 0.5) * 3 }
        ]
      };
      
      setSimulationResults(results);
      setIsSimulating(false);
    }, 2000);
  };

  const saveScenario = () => {
    const newScenario = {
      id: scenarios.length + 1,
      name: `Scenario ${scenarios.length}`,
      parameters: { ...currentScenario },
      results: simulationResults,
      isActive: false
    };
    setScenarios([...scenarios, newScenario]);
  };

  const resetToDefaults = () => {
    setCurrentScenario({
      ruralQuota: 25,
      socialInclusionQuota: 30,
      skillWeight: 35,
      locationWeight: 20,
      minimumMatchScore: 60
    });
    setSimulationResults(null);
  };

  const ParameterSlider = ({ label, value, onChange, min = 0, max = 100, step = 1, unit = '%', description }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-900">{value}</span>
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );

  const ComparisonCard = ({ title, current, newValue, icon: Icon, color = 'blue', isPercentage = false }) => {
    const difference = newValue - current;
    const percentageChange = isPercentage ? difference : (difference / current) * 100;
    const isPositive = difference > 0;
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${color === 'blue' ? 'bg-blue-100' : color === 'green' ? 'bg-green-100' : 'bg-purple-100'}`}>
              <Icon className={`h-5 w-5 ${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : 'text-purple-600'}`} />
            </div>
            <h4 className="font-medium text-gray-900 ml-3">{title}</h4>
          </div>
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            <span className="text-sm font-medium">
              {isPositive ? '+' : ''}{Math.abs(percentageChange).toFixed(1)}{isPercentage ? '%' : '%'}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Current:</span>
            <span className="font-medium">{current}{isPercentage ? '%' : ''}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">New:</span>
            <span className="font-medium">{newValue.toFixed(1)}{isPercentage ? '%' : ''}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">What-If Simulator</h1>
            <p className="text-gray-600 mt-2">
              Test different policy scenarios and see their impact on allocation outcomes
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={resetToDefaults}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors font-medium ${
                isSimulating
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Play className="h-5 w-5 mr-2" />
              {isSimulating ? 'Simulating...' : 'Run Simulation'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scenario Parameters</h3>
            
            <div className="space-y-6">
              <ParameterSlider
                label="Rural/Aspirational Districts Quota"
                value={currentScenario.ruralQuota}
                onChange={(value) => setCurrentScenario(prev => ({ ...prev, ruralQuota: value }))}
                description="Minimum percentage of internships for rural students"
              />
              
              <ParameterSlider
                label="Social Inclusion Quota"
                value={currentScenario.socialInclusionQuota}
                onChange={(value) => setCurrentScenario(prev => ({ ...prev, socialInclusionQuota: value }))}
                description="Minimum percentage for reserved categories"
              />
              
              <ParameterSlider
                label="Skill Match Weight"
                value={currentScenario.skillWeight}
                onChange={(value) => setCurrentScenario(prev => ({ ...prev, skillWeight: value }))}
                description="Importance of skill matching in allocation"
              />
              
              <ParameterSlider
                label="Location Preference Weight"
                value={currentScenario.locationWeight}
                onChange={(value) => setCurrentScenario(prev => ({ ...prev, locationWeight: value }))}
                description="Importance of location preferences"
              />
              
              <ParameterSlider
                label="Minimum Match Score"
                value={currentScenario.minimumMatchScore}
                onChange={(value) => setCurrentScenario(prev => ({ ...prev, minimumMatchScore: value }))}
                min={30}
                max={90}
                description="Lowest acceptable match score"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Scenarios</h3>
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    scenario.isActive
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{scenario.name}</h4>
                      <p className="text-sm text-gray-600">
                        {scenario.results.totalMatches} matches • {scenario.results.avgScore}% avg score
                      </p>
                    </div>
                    {scenario.isActive && (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {simulationResults ? (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ComparisonCard
                    title="Total Matches"
                    current={scenarios[0].results.totalMatches}
                    newValue={simulationResults.totalMatches}
                    icon={Users}
                    color="blue"
                  />
                  <ComparisonCard
                    title="Average Score"
                    current={scenarios[0].results.avgScore}
                    newValue={simulationResults.avgScore}
                    icon={Target}
                    color="green"
                    isPercentage
                  />
                  <ComparisonCard
                    title="Rural Representation"
                    current={scenarios[0].results.ruralRepresentation}
                    newValue={simulationResults.ruralRepresentation}
                    icon={MapPin}
                    color="purple"
                    isPercentage
                  />
                  <ComparisonCard
                    title="Social Inclusion"
                    current={scenarios[0].results.socialInclusion}
                    newValue={simulationResults.socialInclusion}
                    icon={Award}
                    color="green"
                    isPercentage
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Distribution Impact</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={simulationResults.sectorDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#cbd5e1" name="Current" />
                    <Bar dataKey="new" fill="#3b82f6" name="New Scenario" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-700">
                        <strong>Unallocated Students:</strong> {simulationResults.unallocatedStudents.toLocaleString()} students 
                        would remain unallocated under this scenario.
                      </p>
                    </div>
                  </div>
                  
                  {simulationResults.ruralRepresentation < 25 && (
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700">
                          <strong>Policy Warning:</strong> Rural representation would fall below the 25% target 
                          ({simulationResults.ruralRepresentation.toFixed(1)}%).
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {simulationResults.avgScore > scenarios[0].results.avgScore && (
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700">
                          <strong>Quality Improvement:</strong> Average match score would improve by 
                          {(simulationResults.avgScore - scenarios[0].results.avgScore).toFixed(1)} percentage points.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setSimulationResults(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Clear Results
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={saveScenario}
                    className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Save Scenario
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                    Apply Changes
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Simulate</h3>
              <p className="text-gray-600 mb-6">
                Adjust the parameters on the left and click "Run Simulation" to see how changes 
                would impact the allocation outcomes.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                <h4 className="font-medium text-blue-900 mb-2">What you can test:</h4>
                <ul className="text-sm text-blue-700 text-left space-y-1">
                  <li>• Impact of changing quota percentages</li>
                  <li>• Effect of adjusting matching weights</li>
                  <li>• Quality vs. quantity trade-offs</li>
                  <li>• Policy compliance scenarios</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatIfSimulator;