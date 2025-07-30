const getRegionsQuery = `
SELECT 
  regions.id AS region_id,
  regions.name AS region_name,
  COUNT(locals.region_id) AS total_locals
FROM regions
LEFT JOIN locals ON locals.region_id = regions.id
GROUP BY regions.id, regions.name;
`;
const getTypologiesQuery = `
SELECT 
	typologies.name
FROM typologies;
`;

export {
	getRegionsQuery,
	getTypologiesQuery
}