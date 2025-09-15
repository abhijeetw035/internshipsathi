import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  MapPin, 
  Award, 
  Target, 
  Zap,
  Info,
  RotateCcw
} from 'lucide-react';

const Configuration = () => {
  const [config, setConfig] = useState({
    skillWeight: 35,
    locationWeight: 20,
    sectorWeight: 15,
    qualificationWeight: 10,
    
    ruralQuota: 25,
    socialInclusionQuota: 30,
    genderDiversityWeight: 5,
    previousParticipationPenalty: 10,
    
    minimumMatchScore: 60,
    maximumDistance: 500, // km
    maxApplicationsPerStudent: 5,
    
    algorithmType: 'weighted_score',
    enableLearningMode: true,
    feedbackWeight: 15,
    
    enableGeographicClustering: true,
    enableSkillSubstitution: true,
    enableTimeSlotOptimization: false
  });

  const [activeTab, setActiveTab] = useState('matching');

  const updateConfig = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetToDefaults = () => {
    setConfig({
      skillWeight: 35,
      locationWeight: 20,
      sectorWeight: 15,
      qualificationWeight: 10,
      ruralQuota: 25,
      socialInclusionQuota: 30,
      genderDiversityWeight: 5,
      previousParticipationPenalty: 10,
      minimumMatchScore: 60,
      maximumDistance: 500,
      maxApplicationsPerStudent: 5,
      algorithmType: 'weighted_score',
      enableLearningMode: true,
      feedbackWeight: 15,
      enableGeographicClustering: true,
      enableSkillSubstitution: true,
      enableTimeSlotOptimization: false
    });
  };

  const tabs = [
    { id: 'matching', name: 'Matching Weights', icon: Target },
    { id: 'policy', name: 'Policy Parameters', icon: Award },
    { id: 'quality', name: 'Quality Thresholds', icon: Zap },
    { id: 'advanced', name: 'Advanced Settings', icon: Settings }
  ];

  const SliderComponent = ({ label, value, onChange, min = 0, max = 100, step = 1, unit = '%', description }) => (
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
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );

  const ToggleComponent = ({ label, value, onChange, description }) => (
    <div className="flex items-center justify-between">
      <div>
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const SelectComponent = ({ label, value, onChange, options, description }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderMatchingWeights = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Matching Weights</h4>
            <p className="text-sm text-blue-700 mt-1">
              Configure how the algorithm prioritizes different factors when matching students with internships. 
              Total weight should not exceed 100%.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SliderComponent
          label="Skill Match Weight"
          value={config.skillWeight}
          onChange={(value) => updateConfig('skillWeight', value)}
          description="How much importance to give to matching student skills with job requirements"
        />
        
        <SliderComponent
          label="Location Preference Weight"
          value={config.locationWeight}
          onChange={(value) => updateConfig('locationWeight', value)}
          description="Priority given to student's preferred work locations"
        />
        
        <SliderComponent
          label="Sector Interest Weight"
          value={config.sectorWeight}
          onChange={(value) => updateConfig('sectorWeight', value)}
          description="Importance of matching student's sector interests"
        />
        
        <SliderComponent
          label="Qualification Weight"
          value={config.qualificationWeight}
          onChange={(value) => updateConfig('qualificationWeight', value)}
          description="Weight given to educational qualification matching"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Weight Distribution</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Weight:</span>
            <span className={`font-medium ${
              (config.skillWeight + config.locationWeight + config.sectorWeight + config.qualificationWeight) === 100
                ? 'text-green-600' : 'text-red-600'
            }`}>
              {config.skillWeight + config.locationWeight + config.sectorWeight + config.qualificationWeight}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min(100, config.skillWeight + config.locationWeight + config.sectorWeight + config.qualificationWeight)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPolicyParameters = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <Award className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-green-900">Policy Parameters</h4>
            <p className="text-sm text-green-700 mt-1">
              Configure affirmative action and diversity parameters to ensure fair representation 
              across different social and geographic categories.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SliderComponent
          label="Rural/Aspirational Districts Quota"
          value={config.ruralQuota}
          onChange={(value) => updateConfig('ruralQuota', value)}
          description="Minimum percentage of internships to be allocated to students from rural areas"
        />
        
        <SliderComponent
          label="Social Inclusion Quota"
          value={config.socialInclusionQuota}
          onChange={(value) => updateConfig('socialInclusionQuota', value)}
          description="Minimum percentage for students from reserved categories"
        />
        
        <SliderComponent
          label="Gender Diversity Weight"
          value={config.genderDiversityWeight}
          onChange={(value) => updateConfig('genderDiversityWeight', value)}
          description="Bonus weight given to gender-balanced allocations"
        />
        
        <SliderComponent
          label="Previous Participation Penalty"
          value={config.previousParticipationPenalty}
          onChange={(value) => updateConfig('previousParticipationPenalty', value)}
          description="Reduction in priority for students who participated before"
        />
      </div>
    </div>
  );

  const renderQualityThresholds = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start">
          <Zap className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-purple-900">Quality Thresholds</h4>
            <p className="text-sm text-purple-700 mt-1">
              Set minimum quality standards and constraints for the matching process.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SliderComponent
          label="Minimum Match Score"
          value={config.minimumMatchScore}
          onChange={(value) => updateConfig('minimumMatchScore', value)}
          min={30}
          max={95}
          description="Lowest acceptable match score for a valid allocation"
        />
        
        <SliderComponent
          label="Maximum Distance"
          value={config.maximumDistance}
          onChange={(value) => updateConfig('maximumDistance', value)}
          min={50}
          max={1000}
          step={50}
          unit="km"
          description="Maximum distance between student and internship location"
        />
        
        <SliderComponent
          label="Max Applications per Student"
          value={config.maxApplicationsPerStudent}
          onChange={(value) => updateConfig('maxApplicationsPerStudent', value)}
          min={1}
          max={10}
          description="Maximum number of internship options per student"
        />
      </div>

      <SelectComponent
        label="Algorithm Type"
        value={config.algorithmType}
        onChange={(value) => updateConfig('algorithmType', value)}
        options={[
          { value: 'weighted_score', label: 'Weighted Score Matching' },
          { value: 'hungarian', label: 'Hungarian Algorithm (Optimal)' },
          { value: 'genetic', label: 'Genetic Algorithm' },
          { value: 'hybrid', label: 'Hybrid Approach' }
        ]}
        description="Choose the matching algorithm approach"
      />
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start">
          <Settings className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-gray-900">Advanced Settings</h4>
            <p className="text-sm text-gray-700 mt-1">
              Fine-tune the matching engine with advanced features and optimizations.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <ToggleComponent
          label="Enable Learning Mode"
          value={config.enableLearningMode}
          onChange={(value) => updateConfig('enableLearningMode', value)}
          description="Allow the system to learn from feedback and improve over time"
        />

        <ToggleComponent
          label="Enable Geographic Clustering"
          value={config.enableGeographicClustering}
          onChange={(value) => updateConfig('enableGeographicClustering', value)}
          description="Group students and internships by geographic proximity for better allocation"
        />

        <ToggleComponent
          label="Enable Skill Substitution"
          value={config.enableSkillSubstitution}
          onChange={(value) => updateConfig('enableSkillSubstitution', value)}
          description="Allow similar skills to be considered as alternatives (e.g., Python ↔ Java)"
        />

        <ToggleComponent
          label="Enable Time Slot Optimization"
          value={config.enableTimeSlotOptimization}
          onChange={(value) => updateConfig('enableTimeSlotOptimization', value)}
          description="Optimize internship start dates based on student availability"
        />

        <SliderComponent
          label="Feedback Learning Weight"
          value={config.feedbackWeight}
          onChange={(value) => updateConfig('feedbackWeight', value)}
          description="How much to weight historical feedback in future matches"
        />
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Configuration</h1>
            <p className="text-gray-600 mt-2">
              Configure matching parameters and policy settings for the allocation engine
            </p>
          </div>
          <button
            onClick={resetToDefaults}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="slide-up">
        {activeTab === 'matching' && renderMatchingWeights()}
        {activeTab === 'policy' && renderPolicyParameters()}
        {activeTab === 'quality' && renderQualityThresholds()}
        {activeTab === 'advanced' && renderAdvancedSettings()}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Changes will be applied to the next matching run
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            Save as Draft
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configuration;