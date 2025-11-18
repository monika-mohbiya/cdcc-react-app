import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import logo from '/cdcclogo.png';

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()
	// Base API URL (set this in cdcc-react-app/.env as VITE_API_URL)
	// If not provided, fallback to empty string so relative paths still work.
	const API_BASE = import.meta.env.VITE_API_URL || ''

	const maindiv = {
		height: "98vh",
		background: "#33567e",
		margin: "auto",
		display: "flex",
		justifyContent: "center",  // camelCase
		alignItems: "center"       // no space, camelCase
	};

	const main_matcard = {
		border: "2px solid rgba(0, 0, 0, 0.125)",
		borderRadius: "0.50rem",
		background: "#fff ",
		boxShadow: "0 1rem 3rem rgba(0, 0, 0, .175)",
		display: "block ",
		position: "relative",
		alignItems: "center",
		alignSelf: "center",
		padding: "25px"

	};

	const onSubmit = async (e) => {
		e.preventDefault()
		setError('')
		try {
			if (email === 'admin' && password === 'password') {
				localStorage.setItem('token', 'admin')
				navigate('/students')
				return
			} else {
				throw new Error('Invalid credentials')
			}
		} catch (err) {
			setError(err.message || 'Login failed')
		}
	}

	return (
		// <div style={{ maxWidth: 420, margin: '64px auto', padding: 24, border: '1px solid #e5e7eb', borderRadius: 8 }}>

		// 	<div style={{ textAlign: 'center', marginBottom: 24 }}>
		// 		<img src="cdcclogo.png" alt="CDCC LOGO" />
		// 	</div>
		// 	<h2 style={{ margin: '0 0 16px' }}>Login</h2>

		// 	<form onSubmit={onSubmit}>
		// 		<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
		// 			<label>
		// 				<div>UserName</div>
		// 				<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} />
		// 			</label>
		// 			<label>
		// 				<div>Password</div>
		// 				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} />
		// 			</label>
		// 			<button type="submit" style={{ padding: '10px 14px', border: 0, borderRadius: 6, background: '#2563eb', color: '#fff', cursor: 'pointer' }}>Sign in</button>
		// 			{error && <div style={{ color: '#dc2626' }}>{error}</div>}
		// 		</div>
		// 	</form>
		// </div>
		<div className="row" style={maindiv}>
			<div className="col-4 col-sm-8 col-md-8 col-lg-6 " style={main_matcard}>
				<div style={{ textAlign: 'center', marginBottom: 24 }}>
					<img src="cdcclogo.png" alt="CDCC Logo" />
				</div>
				<h2 style={{ margin: '0 0 16px' }}>Login</h2>

				<form onSubmit={onSubmit}>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
						<label>
							<div>UserName</div>
							<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '95%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} placeholder='admin' />
						</label>
						<label>
							<div>Password</div>
							<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '95%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} placeholder='password' />
						</label>
						<div className="" style={{ textAlign: 'center' }}>
							<button type="submit" style={{ padding: '10px 14px', border: 0, borderRadius: 6, background: '#2563eb', color: '#fff', cursor: 'pointer' }}>Sign in</button>
						</div>
						{error && <div style={{ color: '#dc2626' }}>{error}</div>}
					</div>
				</form>
			</div>
		</div>

	)
}


