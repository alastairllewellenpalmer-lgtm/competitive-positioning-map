// scripts/sync-notion.js
// Fetches competitor data from Notion and writes to JSON file

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function syncNotionData() {
  console.log('Fetching competitor data from Notion...');
  
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: 'Name', direction: 'ascending' }]
  });

  const competitors = response.results.map(page => {
    const props = page.properties;
    
    return {
      name: props.Name?.title?.[0]?.plain_text || '',
      type: props.Type?.select?.name || 'Direct',
      targetSegment: props['Target Segment']?.select?.name || '',
      pricingModel: props['Pricing Model']?.rich_text?.[0]?.plain_text || '',
      keyDifferentiator: props['Key Differentiator']?.rich_text?.[0]?.plain_text || '',
      g2Rating: props['G2 Rating']?.number || null,
      easeOfUse: props['Ease of Use']?.number || 50,
      priceLevel: props['Price Level']?.number || 50
    };
  });

  const data = {
    lastUpdated: new Date().toISOString().split('T')[0],
    competitors
  };

  const outputPath = path.join(__dirname, '../src/data/competitors-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  
  console.log(`✓ Synced ${competitors.length} competitors`);
  console.log(`✓ Written to ${outputPath}`);
}

syncNotionData().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
