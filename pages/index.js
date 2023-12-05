import { useState } from 'react';

export default function Home() {
    const [domain, setDomain] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/whois', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domain }),
        });
        const data = await response.json();
        setResult(data);
    };

    return (
        <div>
            <h1>Whois查询</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="输入域名"
                    required
                />
                <button type="submit">查询</button>
            </form>
            {result && (
                <div>
                    <h2>查询结果</h2>
                    <p>注册状态：{result.status}</p>
                    <p>注册时间：{result.creationDate}</p>
                    <p>Whois信息：{result.whois}</p>
                </div>
            )}
        </div>
    );
}