import { useState } from 'react'
import './App.css'

const initialTodos = [
  {
    id: 1,
    title: 'Mengerjakan Tugas Basis Data',
    description: 'Menyelesaikan tugas database dan membuat laporan.',
    priority: 'Tinggi',
    deadline: '2026-11-20',
    status: 'Belum Selesai'
  },
  {
    id: 2,
    title: 'Belajar React.js',
    description: 'Mempelajari komponen, props, dan React State.',
    priority: 'Sedang',
    deadline: '2026-11-22',
    status: 'Sedang Dikerjakan'
  },
  {
    id: 3,
    title: 'Membaca Materi Kuliah',
    description: 'Mempelajari materi pertemuan berikutnya.',
    priority: 'Rendah',
    deadline: '2026-11-25',
    status: 'Selesai'
  }
]

function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [showForm, setShowForm] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('Semua')

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Sedang',
    deadline: '',
    status: 'Belum Selesai'
  })

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      priority: 'Sedang',
      deadline: '',
      status: 'Belum Selesai'
    })
    setEditingId(null)
    setShowForm(false)
  }

  const saveTodo = (e) => {
    e.preventDefault()

    if (editingId) {
      setTodos(todos.map(todo =>
        todo.id === editingId
          ? { ...form, id: editingId }
          : todo
      ))
    } else {
      setTodos([
        ...todos,
        { ...form, id: Date.now() }
      ])
    }

    resetForm()
  }

  const editTodo = (todo) => {
    setForm({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      deadline: todo.deadline,
      status: todo.status
    })
    setEditingId(todo.id)
    setShowForm(true)
    setSelectedTodo(null)
  }

  const deleteTodo = (id) => {
    if (window.confirm('Apakah kamu yakin ingin menghapus tugas ini?')) {
      setTodos(todos.filter(todo => todo.id !== id))
      setSelectedTodo(null)
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Semua') return true
    return todo.status === filter
  })

  const completed = todos.filter(
    todo => todo.status === 'Selesai'
  ).length

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>✦ TaskFlow</h2>
        <p className="side-label">MENU UTAMA</p>

        <button
          className={filter === 'Semua' ? 'nav active' : 'nav'}
          onClick={() => setFilter('Semua')}
        >
          ▦ Semua Tugas
        </button>

        <button
          className={filter === 'Belum Selesai' ? 'nav active' : 'nav'}
          onClick={() => setFilter('Belum Selesai')}
        >
          ◷ Belum Selesai
        </button>

        <button
          className={filter === 'Sedang Dikerjakan' ? 'nav active' : 'nav'}
          onClick={() => setFilter('Sedang Dikerjakan')}
        >
          ◉ Sedang Dikerjakan
        </button>

        <button
          className={filter === 'Selesai' ? 'nav active' : 'nav'}
          onClick={() => setFilter('Selesai')}
        >
          ✓ Selesai
        </button>

        <div className="sidebar-bottom">
          <p>TO-DO LIST APP</p>
          <small>React.js Frontend Project</small>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Daftar Tugas</h1>
            <p>Atur kegiatanmu dan selesaikan tugas tepat waktu.</p>
          </div>

          <button className="add-btn" onClick={() => {
            resetForm()
            setShowForm(true)
          }}>
            + Tambah Tugas
          </button>
        </header>

        <section className="stats">
          <div className="stat-card">
            <span>Total Tugas</span>
            <h2>{todos.length}</h2>
            <p>Semua tugas</p>
          </div>

          <div className="stat-card">
            <span>Belum Selesai</span>
            <h2>{todos.filter(t => t.status === 'Belum Selesai').length}</h2>
            <p>Perlu dikerjakan</p>
          </div>

          <div className="stat-card">
            <span>Dikerjakan</span>
            <h2>{todos.filter(t => t.status === 'Sedang Dikerjakan').length}</h2>
            <p>Sedang berlangsung</p>
          </div>

          <div className="stat-card">
            <span>Selesai</span>
            <h2>{completed}</h2>
            <p>Tugas terselesaikan</p>
          </div>
        </section>

        <section className="task-section">
          <div className="section-heading">
            <div>
              <h2>{filter}</h2>
              <p>Kelola dan pantau semua kegiatanmu.</p>
            </div>
            <span>{filteredTodos.length} Tugas</span>
          </div>

          <div className="task-list">
            {filteredTodos.map(todo => (
              <article className="task-card" key={todo.id}>
                <div className="task-info">
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>

                  <div className="task-meta">
                    <span className={`priority ${todo.priority.toLowerCase()}`}>
                      {todo.priority}
                    </span>
                    <span>▦ {todo.deadline || 'Tanpa deadline'}</span>
                    <span className="status">{todo.status}</span>
                  </div>
                </div>

                <div className="task-actions">
                  <button onClick={() => setSelectedTodo(todo)}>
                    Detail
                  </button>
                  <button onClick={() => editTodo(todo)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => deleteTodo(todo.id)}>
                    Hapus
                  </button>
                </div>
              </article>
            ))}

            {filteredTodos.length === 0 && (
              <div className="empty">
                <h3>Belum ada tugas</h3>
                <p>Tambahkan tugas baru untuk memulai.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {showForm && (
        <div className="modal-overlay">
          <form className="modal" onSubmit={saveTodo}>
            <h2>{editingId ? 'Edit Tugas' : 'Tambah Tugas Baru'}</h2>

            <label>Judul Tugas</label>
            <input
              required
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              placeholder="Masukkan judul tugas"
            />

            <label>Deskripsi</label>
            <textarea
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              placeholder="Masukkan deskripsi tugas"
            />

            <label>Prioritas</label>
            <select
              value={form.priority}
              onChange={e => setForm({...form, priority: e.target.value})}
            >
              <option>Tinggi</option>
              <option>Sedang</option>
              <option>Rendah</option>
            </select>

            <label>Deadline</label>
            <input
              type="date"
              value={form.deadline}
              onChange={e => setForm({...form, deadline: e.target.value})}
            />

            <label>Status</label>
            <select
              value={form.status}
              onChange={e => setForm({...form, status: e.target.value})}
            >
              <option>Belum Selesai</option>
              <option>Sedang Dikerjakan</option>
              <option>Selesai</option>
            </select>

            <div className="modal-actions">
              <button type="button" onClick={resetForm}>Batal</button>
              <button type="submit" className="add-btn">Simpan</button>
            </div>
          </form>
        </div>
      )}

      {selectedTodo && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Detail Tugas</h2>
            <h3>{selectedTodo.title}</h3>
            <p>{selectedTodo.description}</p>
            <p><b>Prioritas:</b> {selectedTodo.priority}</p>
            <p><b>Deadline:</b> {selectedTodo.deadline || 'Tidak ditentukan'}</p>
            <p><b>Status:</b> {selectedTodo.status}</p>

            <div className="modal-actions">
              <button onClick={() => setSelectedTodo(null)}>Tutup</button>
              <button className="add-btn" onClick={() => editTodo(selectedTodo)}>
                Edit Tugas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
