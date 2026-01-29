import React, { useState } from 'react';

// This data will be loaded from competitors-data.json at build time
// When connected to Notion, a GitHub Action will update this file weekly
const competitorData = {
  "lastUpdated": "2025-01-29",
  "competitors": [
    { "name": "Hive Perform", "type": "You", "targetSegment": "SMB/Mid-Market", "pricingModel": "£1k-£3k/month", "keyDifferentiator": "AI-native closed-loop execution", "g2Rating": null, "easeOfUse": 75, "priceLevel": 35, "keyNotes": "" },
    { "name": "Gong", "type": "Direct", "targetSegment": "Mid-Market/Enterprise", "pricingModel": "~$1,200-1,600/user/year", "keyDifferentiator": "Conversation intelligence leader", "g2Rating": 4.7, "easeOfUse": 65, "priceLevel": 80, "keyNotes": "" },
    { "name": "Clari", "type": "Direct", "targetSegment": "Mid-Market/Enterprise", "pricingModel": "Custom", "keyDifferentiator": "Revenue forecasting & operations", "g2Rating": 4.5, "easeOfUse": 40, "priceLevel": 85, "keyNotes": "" },
    { "name": "MediaFly", "type": "Direct", "targetSegment": "Enterprise", "pricingModel": "Custom enterprise", "keyDifferentiator": "Sales content management", "g2Rating": 4.3, "easeOfUse": 25, "priceLevel": 88, "keyNotes": "" },
    { "name": "WorkRamp", "type": "Direct", "targetSegment": "Mid-Market/Enterprise", "pricingModel": "~$25-40/user/month", "keyDifferentiator": "Sales training LMS with superior UX", "g2Rating": 4.7, "easeOfUse": 80, "priceLevel": 55, "keyNotes": "" },
    { "name": "Highspot", "type": "Direct", "targetSegment": "Mid-Market/Enterprise", "pricingModel": "Custom", "keyDifferentiator": "Sales enablement platform", "g2Rating": 4.6, "easeOfUse": 50, "priceLevel": 82, "keyNotes": "" },
    { "name": "Seismic", "type": "Direct", "targetSegment": "Enterprise", "pricingModel": "Custom enterprise", "keyDifferentiator": "Content enablement & automation", "g2Rating": 4.5, "easeOfUse": 30, "priceLevel": 90, "keyNotes": "" },
    { "name": "Allego", "type": "Direct", "targetSegment": "Mid-Market/Enterprise", "pricingModel": "Custom", "keyDifferentiator": "Revenue enablement (training focus)", "g2Rating": 4.6, "easeOfUse": 45, "priceLevel": 78, "keyNotes": "" },
    { "name": "Momentum.ai", "type": "Indirect", "targetSegment": "SMB/Mid-Market", "pricingModel": "~$15-29/user/month", "keyDifferentiator": "Sales workflow automation", "g2Rating": 4.8, "easeOfUse": 85, "priceLevel": 25, "keyNotes": "" },
    { "name": "Oliv.ai", "type": "Indirect", "targetSegment": "SMB/Mid-Market", "pricingModel": "Usage-based", "keyDifferentiator": "AI sales assistant", "g2Rating": 4.7, "easeOfUse": 78, "priceLevel": 22, "keyNotes": "" },
    { "name": "Klue", "type": "Indirect", "targetSegment": "Mid-Market/Enterprise", "pricingModel": "~$1,000+/user/year", "keyDifferentiator": "Competitive intelligence only", "g2Rating": 4.8, "easeOfUse": 60, "priceLevel": 75, "keyNotes": "" }
  ]
};

const typeColors = {
  'You': { bg: '#10b981', ring: 'ring-emerald-400' },
  'Direct': { bg: '#ef4444', ring: '' },
  'Indirect': { bg: '#3b82f6', ring: '' },
  'UX Leader': { bg: '#f59e0b', ring: '' }
};

const quadrants = [
  { label: 'Technical Solutions', x: 25, y: 75, desc: 'Low Price / Complex' },
  { label: 'Enterprise Players', x: 75, y: 75, desc: 'High Price / Complex' },
  { label: 'Budget Tools', x: 25, y: 25, desc: 'Low Price / Easy' },
  { label: 'Target Zone', x: 75, y: 25, desc: 'Competitive Price / Easy', highlight: true },
];

export default function CompetitiveMap() {
  const [hoveredCompetitor, setHoveredCompetitor] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [showTable, setShowTable] = useState(false);

  const competitors = competitorData.competitors.map(c => ({
    ...c,
    x: c.easeOfUse,
    y: c.priceLevel,
    color: typeColors[c.type]?.bg || '#6b7280',
    size: c.type === 'You' ? 14 : c.type === 'Direct' ? 11 : 9
  }));

  const filteredCompetitors = selectedType === 'all' 
    ? competitors 
    : competitors.filter(c => c.type === selectedType);

  const types = ['all', ...new Set(competitors.map(c => c.type))];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl">
      <div className="flex justify-between items-start mb-1">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Competitive Positioning Map</h2>
          <p className="text-sm text-gray-500">Price vs. Ease of Use</p>
        </div>
        <div className="text-xs text-gray-400">
          Updated: {competitorData.lastUpdated}
        </div>
      </div>
      
      {/* Filter buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                selectedType === type 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {type === 'all' ? 'All' : type}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowTable(!showTable)}
          className="px-3 py-1 text-xs rounded-full bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
        >
          {showTable ? 'Hide Table' : 'Show Table'}
        </button>
      </div>

      {/* Chart container */}
      <div className="relative bg-white rounded-lg border border-gray-200 p-4" style={{ height: '420px' }}>
        {/* Quadrant backgrounds */}
        <div className="absolute inset-4 grid grid-cols-2 grid-rows-2">
          <div className="bg-gray-50 border-r border-b border-gray-200"></div>
          <div className="bg-red-50/30 border-b border-gray-200"></div>
          <div className="bg-gray-50 border-r border-gray-200"></div>
          <div className="bg-emerald-50/50"></div>
        </div>

        {/* Axes */}
        <div className="absolute left-4 top-4 bottom-4 w-px bg-gray-300"></div>
        <div className="absolute left-4 right-4 bottom-4 h-px bg-gray-300"></div>
        
        {/* Axis labels */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-gray-500 whitespace-nowrap">
          PRICE →
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500">
          EASE OF USE →
        </div>

        {/* Quadrant labels */}
        {quadrants.map((q, i) => (
          <div
            key={i}
            className="absolute text-center pointer-events-none"
            style={{
              left: `${q.x}%`,
              top: `${100 - q.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={`text-xs font-semibold ${q.highlight ? 'text-emerald-700' : 'text-gray-400'}`}>
              {q.label}
            </div>
          </div>
        ))}

        {/* Competitors */}
        {filteredCompetitors.map((c) => (
          <div
            key={c.name}
            className="absolute cursor-pointer transition-all duration-200 hover:z-50"
            style={{
              left: `calc(${c.x}% - ${c.size/2}px)`,
              top: `calc(${100 - c.y}% - ${c.size/2}px)`,
              marginLeft: '16px',
              marginTop: '16px',
            }}
            onMouseEnter={() => setHoveredCompetitor(c)}
            onMouseLeave={() => setHoveredCompetitor(null)}
          >
            <div
              className={`rounded-full border-2 border-white shadow-md transition-transform ${
                hoveredCompetitor?.name === c.name ? 'scale-150' : ''
              } ${c.type === 'You' ? 'ring-2 ring-emerald-400 ring-offset-1' : ''}`}
              style={{
                width: `${c.size * 2}px`,
                height: `${c.size * 2}px`,
                backgroundColor: c.color,
              }}
            />
            {c.type === 'You' && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-emerald-700 whitespace-nowrap">
                {c.name}
              </div>
            )}
          </div>
        ))}

        {/* Tooltip */}
        {hoveredCompetitor && (
          <div 
            className="absolute z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl text-sm pointer-events-none min-w-48"
            style={{
              left: `${Math.min(Math.max(hoveredCompetitor.x, 20), 80)}%`,
              top: `${Math.max(100 - hoveredCompetitor.y - 15, 5)}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="font-semibold">{hoveredCompetitor.name}</div>
            <div className="text-gray-300 text-xs mt-1">
              <div>{hoveredCompetitor.type} • G2: {hoveredCompetitor.g2Rating || 'N/A'}</div>
              <div className="text-gray-400 mt-1">{hoveredCompetitor.keyDifferentiator}</div>
              <div className="text-gray-400">{hoveredCompetitor.pricingModel}</div>
              {hoveredCompetitor.keyNotes && (
                <div className="text-gray-400 mt-1 italic">{hoveredCompetitor.keyNotes}</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-400 ring-offset-1"></div>
          <span className="text-gray-600">Hive Perform</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-600">Direct</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-gray-600">Indirect</span>
        </div>
      </div>

      {/* Data Table (collapsible) */}
      {showTable && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Competitor</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Type</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Segment</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Pricing</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">G2</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Differentiator</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr key={c.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-3 py-2 font-medium">{c.name}</td>
                  <td className="px-3 py-2">
                    <span 
                      className="px-2 py-0.5 rounded-full text-white text-xs"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.type}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{c.targetSegment}</td>
                  <td className="px-3 py-2 text-gray-600">{c.pricingModel}</td>
                  <td className="px-3 py-2 text-gray-600">{c.g2Rating || '-'}</td>
                  <td className="px-3 py-2 text-gray-600">{c.keyDifferentiator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Key insight */}
      <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
        <div className="text-xs font-semibold text-emerald-800 mb-1">Strategic Position</div>
        <div className="text-xs text-emerald-700">
          Hive Perform occupies a differentiated position: competitive pricing with high ease-of-use, 
          while most direct competitors cluster in the high-price/complex quadrant.
        </div>
      </div>
    </div>
  );
}
