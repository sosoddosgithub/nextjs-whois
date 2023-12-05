export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { domain } = req.body;
    if (!domain) {
        return res.status(400).json({ error: 'Missing domain' });
    }

    const [name, suffix] = domain.split('.');
    if (!name || !suffix) {
        return res.status(400).json({ error: 'Invalid domain' });
    }

    try {
        const response = await fetch(`https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`);
        if (!response.ok) {
            throw new Error('Failed to fetch whois info');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}