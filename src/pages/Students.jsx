import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import candidateData from '../model/candidate.json';

export default function Students() {
	const [students, setStudents] = useState([])
	const [search, setSearch] = useState('')
	const navigate = useNavigate()
	// const API_BASE = import.meta.env.VITE_API_URL || ''
	// console.log(students)

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) return;

		(async () => {
			try {
				const res = await fetch('/cdcc-react-app/model/candidate.json'); // notice path from public/
				if (!res.ok) throw new Error('Failed to fetch JSON');
				const data = await res.json();
				setStudents(data);
			} catch (error) {
				console.error('Fetch error:', error);
			}
		})();
	}, [navigate]);

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase()
		if (!q) return students
		return students.filter((s) => s.enroll.toLowerCase().includes(q))
	}, [search, students])

	const logout = () => {
		localStorage.removeItem('token')
		navigate('/login')
	}

	const view = (s) => {
		navigate('/anskey/' + s.enroll, '_blank');
	}

	return (
		<div style={{ maxWidth: 1000, margin: '24px auto', padding: '0 16px' }}>
			<div style={{ textAlign: 'center', marginBottom: 24 }}>
				<img src="cdcclogo.png" alt="CDCC LOGO" />
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
				<h2 style={{ margin: 0 }}>Students</h2>
				<button onClick={logout} style={{ padding: '8px 12px', border: 0, borderRadius: 6, background: '#ef4444', color: '#fff', cursor: 'pointer' }}>Logout</button>
			</div>
			<div style={{ margin: '12px 0' }}>
				<input placeholder="Search by enrollment..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', maxWidth: 360, padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} />
			</div>
			{/* <div style={{ overflow: 'auto', border: '1px solid #e5e7eb', borderRadius: 8 }}>
				<table style={{ width: '100%', borderCollapse: 'collapse' }}>
					<thead style={{ background: '#f9fafb' }}>
						<tr>
							<th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Enrollment</th>
							<th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Name</th>
							<th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Reg No.</th>
							<th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Post</th>
							<th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>View</th>
						</tr>
					</thead>
					<tbody>
						{filtered.map((s) => (
							<tr key={s.enrollment}>
								<td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{s.enroll}</td>
								<td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{s.name}</td>
								<td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{s.regNo}</td>
								<td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{s.post}</td>
								<td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>
									<button onClick={() => view(s)} style={{ padding: '6px 10px', border: 0, borderRadius: 6, background: '#2563eb', color: '#fff', cursor: 'pointer' }}>View</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div> */}
			<div style={{ overflow: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, maxHeight: '600px' }}>
				<table style={{ width: '100%', borderCollapse: 'collapse' }}>
					<thead style={{ background: '#f9fafb', display: 'table', width: '100%', tableLayout: 'fixed', position: 'sticky', top: 0, zIndex: 1 }}>
						<tr>
							<th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Enrollment</th>
							<th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Name</th>
							<th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Reg No.</th>
							<th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Post</th>
							<th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>View</th>
						</tr>
					</thead>
					<tbody style={{ display: 'block', maxHeight: '500px', overflowY: 'auto' }}>
						{filtered.map((s) => (
							<tr key={s.enrollment} style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
								<td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{s.enroll}</td>
								<td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{s.name}</td>
								<td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{s.regNo}</td>
								<td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{s.post}</td>
								<td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>
									<button onClick={() => view(s)} style={{ padding: '6px 10px', border: 0, borderRadius: 6, background: '#2563eb', color: '#fff', cursor: 'pointer' }}>View</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

		</div>
	)
}


