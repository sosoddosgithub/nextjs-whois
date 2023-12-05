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
                    <p>状态: {result.status === 'ok' ? '已注册' : '未注册'}</p>
                    <p>域名: {result.domain}</p>
                    <p>创建日期: {result.creation_datetime}</p>
                    <p>到期日期: {result.expiry_datetime}</p>
                    <p>信息: <span dangerouslySetInnerHTML={{ __html: result.info.replace(/\r\n/g, '<br />') }} /></p>
                </div>
            )}
        </div>
    );
}
