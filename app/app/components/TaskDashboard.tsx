'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Plus, X, Clock, CheckCircle2, AlertCircle, Zap, Calendar, ListTodo, Layout, Trash2, Edit2, Save, XCircle } from 'lucide-react';

const TaskDashboard = () => {
  const businesses = [
    { name: 'We Motion', category: 'Production House / Creative Agency' },
    { name: 'Kimaeri', category: 'FMCG' },
    { name: 'Medali', category: 'Food & Beverage' },
    { name: 'Kiki Catering', category: 'Catering' },
    { name: 'Blessme', category: 'Aesthetic / Skin Booster' },
    { name: 'F1 Security / Absolute', category: 'Event Organizer & Security' },
    { name: 'Awe', category: 'System & Business Solutions' },
    { name: 'Dermiere', category: 'Aesthetic Clinic' },
    { name: 'Gifted Idea', category: 'Creative Agency / Marketing' },
    { name: 'Semesta Academy', category: 'Training & Riset' },
    { name: 'Stratton Indonesia', category: 'Consulting Training' }
  ];

  const managers = ['Fani', 'Pak Mario'];
  const categories = ['Kerja', 'Ibadah', 'Personal'];
  const priorityOptions = ['high', 'medium', 'low'];

  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('eisenhower');
  const [selectedBusiness, setSelectedBusiness] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedManager, setSelectedManager] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [monthlyGoals, setMonthlyGoals] = useState([]);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState('');

  // Load dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tasks_portfolio');
    const savedGoals = localStorage.getItem('monthlyGoals_portfolio');
    if (saved) setTasks(JSON.parse(saved));
    if (savedGoals) setMonthlyGoals(JSON.parse(savedGoals));
  }, []);

  // Save ke localStorage
  useEffect(() => {
    localStorage.setItem('tasks_portfolio', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('monthlyGoals_portfolio', JSON.stringify(monthlyGoals));
  }, [monthlyGoals]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    business: 'We Motion',
    category: 'Kerja',
    priority: 'medium',
    urgent: false,
    deadline: '',
    timeEstimate: 0,
    timeSpent: 0,
    progress: 0,
    status: 'todo',
    managedBy: 'Fani'
  });

  const handleAddTask = () => {
    if (!formData.title.trim()) return;
    
    const newTask = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...newTask, id: editingTask.id } : t));
      setEditingTask(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      business: 'We Motion',
      category: 'Kerja',
      priority: 'medium',
      urgent: false,
      deadline: '',
      timeEstimate: 0,
      timeSpent: 0,
      progress: 0,
      status: 'todo',
      managedBy: 'Fani'
    });
  };

  const handleEditTask = (task) => {
    setFormData(task);
    setEditingTask(task);
    setShowModal(true);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status, progress: status === 'done' ? 100 : t.progress } : t));
  };

  const updateTaskProgress = (id, progress) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, progress: Math.min(100, Math.max(0, progress)) } : t));
  };

  const updateTaskTime = (id, timeSpent) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, timeSpent } : t));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const businessMatch = selectedBusiness === 'all' || task.business === selectedBusiness;
      const categoryMatch = selectedCategory === 'all' || task.category === selectedCategory;
      const managerMatch = selectedManager === 'all' || task.managedBy === selectedManager;
      return businessMatch && categoryMatch && managerMatch;
    });
  }, [tasks, selectedBusiness, selectedCategory, selectedManager]);

  // Eisenhower Matrix categorization
  const eisenhowerTasks = useMemo(() => {
    return {
      doFirst: filteredTasks.filter(t => t.urgent && t.priority === 'high'),
      schedule: filteredTasks.filter(t => !t.urgent && t.priority === 'high'),
      delegate: filteredTasks.filter(t => t.urgent && t.priority === 'low'),
      eliminate: filteredTasks.filter(t => !t.urgent && t.priority === 'low')
    };
  }, [filteredTasks]);

  // Kanban tasks
  const kanbanTasks = useMemo(() => {
    return {
      todo: filteredTasks.filter(t => t.status === 'todo'),
      inprogress: filteredTasks.filter(t => t.status === 'inprogress'),
      done: filteredTasks.filter(t => t.status === 'done')
    };
  }, [filteredTasks]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = filteredTasks.length;
    const completed = filteredTasks.filter(t => t.status === 'done').length;
    const inProgress = filteredTasks.filter(t => t.status === 'inprogress').length;
    const urgent = filteredTasks.filter(t => t.urgent).length;
    const avgProgress = total > 0 ? Math.round(filteredTasks.reduce((sum, t) => sum + t.progress, 0) / total) : 0;
    const totalTimeSpent = filteredTasks.reduce((sum, t) => sum + (t.timeSpent || 0), 0);
    const totalTimeEstimate = filteredTasks.reduce((sum, t) => sum + (t.timeEstimate || 0), 0);

    return { total, completed, inProgress, urgent, avgProgress, totalTimeSpent, totalTimeEstimate };
  }, [filteredTasks]);

  const addGoal = () => {
    if (newGoal.trim()) {
      setMonthlyGoals([...monthlyGoals, { id: Date.now(), text: newGoal, completed: false }]);
      setNewGoal('');
      setShowGoalModal(false);
    }
  };

  const toggleGoal = (id) => {
    setMonthlyGoals(monthlyGoals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const deleteGoal = (id) => {
    setMonthlyGoals(monthlyGoals.filter(g => g.id !== id));
  };

  // Task Card Component
  const TaskCard = ({ task, onDelete, onEdit, onStatusChange, onProgressChange, onTimeChange }) => {
    const getPriorityColor = (priority) => {
      switch(priority) {
        case 'high': return 'border-l-red-500 bg-red-500 bg-opacity-5';
        case 'medium': return 'border-l-yellow-500 bg-yellow-500 bg-opacity-5';
        case 'low': return 'border-l-green-500 bg-green-500 bg-opacity-5';
        default: return 'border-l-blue-500';
      }
    };

    const getStatusIcon = (status) => {
      switch(status) {
        case 'done': return <CheckCircle2 size={16} className="text-green-500" />;
        case 'inprogress': return <Clock size={16} className="text-yellow-500" />;
        default: return <AlertCircle size={16} className="text-blue-500" />;
      }
    };

    return (
      <div className={`border-l-4 rounded-lg p-4 bg-slate-700 border-slate-600 hover:border-slate-500 transition-all group ${getPriorityColor(task.priority)}`}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 flex-1">
            {getStatusIcon(task.status)}
            <div>
              <h4 className="font-semibold text-white text-sm line-clamp-1">{task.title}</h4>
              <p className="text-xs text-slate-400">{task.business}</p>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(task)} className="p-1 hover:bg-slate-600 rounded">
              <Edit2 size={14} className="text-blue-400" />
            </button>
            <button onClick={() => onDelete(task.id)} className="p-1 hover:bg-slate-600 rounded">
              <Trash2 size={14} className="text-red-400" />
            </button>
          </div>
        </div>

        {task.description && <p className="text-xs text-slate-300 mb-2">{task.description}</p>}

        <div className="grid grid-cols-2 gap-2 mb-3">
          {task.deadline && <div className="text-xs bg-slate-600 rounded px-2 py-1 text-slate-200">{task.deadline}</div>}
          <div className="text-xs bg-slate-600 rounded px-2 py-1 text-slate-200">{task.category}</div>
          <div className="text-xs bg-blue-600 rounded px-2 py-1 text-blue-100 font-semibold">Managed by: {task.managedBy}</div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-400">Progress</span>
            <span className="text-xs font-semibold text-slate-200">{task.progress}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={task.progress}
            onChange={(e) => onProgressChange(task.id, parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-600 rounded cursor-pointer accent-blue-500"
          />
        </div>

        {/* Time Tracking */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-600 rounded px-2 py-1">
            <span className="text-slate-400">Spent: </span>
            <input
              type="number"
              value={task.timeSpent}
              onChange={(e) => onTimeChange(task.id, parseInt(e.target.value) || 0)}
              className="w-12 bg-slate-700 text-white rounded px-1 text-xs"
              min="0"
            />
            h
          </div>
          <div className="bg-slate-600 rounded px-2 py-1">
            <span className="text-slate-400">Est: </span>
            <span className="text-slate-200">{task.timeEstimate}h</span>
          </div>
        </div>

        {/* Status Buttons */}
        <div className="flex gap-1 mt-3">
          <button
            onClick={() => onStatusChange(task.id, 'todo')}
            className={`text-xs px-2 py-1 rounded transition-all ${task.status === 'todo' ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-300 hover:text-white'}`}
          >
            To-do
          </button>
          <button
            onClick={() => onStatusChange(task.id, 'inprogress')}
            className={`text-xs px-2 py-1 rounded transition-all ${task.status === 'inprogress' ? 'bg-yellow-600 text-white' : 'bg-slate-600 text-slate-300 hover:text-white'}`}
          >
            Progress
          </button>
          <button
            onClick={() => onStatusChange(task.id, 'done')}
            className={`text-xs px-2 py-1 rounded transition-all ${task.status === 'done' ? 'bg-green-600 text-white' : 'bg-slate-600 text-slate-300 hover:text-white'}`}
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  // Modal Component
  const Modal = ({ show, title, onClose, children }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Task Commander</h1>
              <p className="text-blue-100 mt-1">Master 11 businesses with precision</p>
            </div>
            <button
              onClick={() => { setShowModal(true); setEditingTask(null); resetForm(); }}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus size={20} /> New Task
            </button>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-3 border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
              <div className="text-xs text-blue-100 font-semibold uppercase">Total</div>
              <div className="text-3xl font-bold mt-1">{metrics.total}</div>
            </div>
            <div className="bg-green-400 bg-opacity-10 backdrop-blur rounded-lg p-3 border border-green-400 border-opacity-30 hover:bg-opacity-20 transition-all">
              <div className="text-xs text-green-100 font-semibold uppercase">Completed</div>
              <div className="text-3xl font-bold mt-1">{metrics.completed}</div>
            </div>
            <div className="bg-yellow-400 bg-opacity-10 backdrop-blur rounded-lg p-3 border border-yellow-400 border-opacity-30 hover:bg-opacity-20 transition-all">
              <div className="text-xs text-yellow-100 font-semibold uppercase">In Progress</div>
              <div className="text-3xl font-bold mt-1">{metrics.inProgress}</div>
            </div>
            <div className="bg-red-400 bg-opacity-10 backdrop-blur rounded-lg p-3 border border-red-400 border-opacity-30 hover:bg-opacity-20 transition-all">
              <div className="text-xs text-red-100 font-semibold uppercase">Urgent</div>
              <div className="text-3xl font-bold mt-1">{metrics.urgent}</div>
            </div>
            <div className="bg-purple-400 bg-opacity-10 backdrop-blur rounded-lg p-3 border border-purple-400 border-opacity-30 hover:bg-opacity-20 transition-all">
              <div className="text-xs text-purple-100 font-semibold uppercase">Avg Progress</div>
              <div className="text-3xl font-bold mt-1">{metrics.avgProgress}%</div>
            </div>
            <div className="bg-cyan-400 bg-opacity-10 backdrop-blur rounded-lg p-3 border border-cyan-400 border-opacity-30 hover:bg-opacity-20 transition-all">
              <div className="text-xs text-cyan-100 font-semibold uppercase">Hours</div>
              <div className="text-3xl font-bold mt-1">{metrics.totalTimeSpent}h</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & View Toggle */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={selectedBusiness}
              onChange={(e) => setSelectedBusiness(e.target.value)}
              className="bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 hover:border-slate-500 focus:border-blue-500 outline-none cursor-pointer text-sm"
            >
              <option value="all">All Businesses</option>
              {businesses.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 hover:border-slate-500 focus:border-blue-500 outline-none cursor-pointer text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={selectedManager}
              onChange={(e) => setSelectedManager(e.target.value)}
              className="bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 hover:border-slate-500 focus:border-blue-500 outline-none cursor-pointer text-sm"
            >
              <option value="all">All Managers</option>
              {managers.map(m => <option key={m} value={m}>{m}</option>)}
            </select>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setView('eisenhower')}
                className={`p-2 rounded transition-all tooltip ${view === 'eisenhower' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600'}`}
                title="Eisenhower Matrix"
              >
                <Zap size={20} />
              </button>
              <button
                onClick={() => setView('kanban')}
                className={`p-2 rounded transition-all ${view === 'kanban' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600'}`}
                title="Kanban Board"
              >
                <Layout size={20} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded transition-all ${view === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600'}`}
                title="List View"
              >
                <ListTodo size={20} />
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`p-2 rounded transition-all ${view === 'calendar' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600'}`}
                title="Calendar View"
              >
                <Calendar size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Eisenhower Matrix View */}
        {view === 'eisenhower' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* DO FIRST */}
            <div className="bg-gradient-to-br from-red-950 to-red-900 rounded-lg border-2 border-red-500 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-red-400" size={24} />
                <h2 className="text-2xl font-bold text-red-100">Do First</h2>
              </div>
              <p className="text-red-200 text-sm mb-4">Urgent & Important</p>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {eisenhowerTasks.doFirst.length === 0 ? (
                  <p className="text-red-300 text-sm italic">No urgent important tasks</p>
                ) : (
                  eisenhowerTasks.doFirst.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={deleteTask}
                      onEdit={handleEditTask}
                      onStatusChange={updateTaskStatus}
                      onProgressChange={updateTaskProgress}
                      onTimeChange={updateTaskTime}
                    />
                  ))
                )}
              </div>
            </div>

            {/* SCHEDULE */}
            <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-lg border-2 border-blue-500 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="text-blue-400" size={24} />
                <h2 className="text-2xl font-bold text-blue-100">Schedule</h2>
              </div>
              <p className="text-blue-200 text-sm mb-4">Not Urgent & Important</p>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {eisenhowerTasks.schedule.length === 0 ? (
                  <p className="text-blue-300 text-sm italic">No scheduled tasks</p>
                ) : (
                  eisenhowerTasks.schedule.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={deleteTask}
                      onEdit={handleEditTask}
                      onStatusChange={updateTaskStatus}
                      onProgressChange={updateTaskProgress}
                      onTimeChange={updateTaskTime}
                    />
                  ))
                )}
              </div>
            </div>

            {/* DELEGATE */}
            <div className="bg-gradient-to-br from-yellow-950 to-yellow-900 rounded-lg border-2 border-yellow-500 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-yellow-400" size={24} />
                <h2 className="text-2xl font-bold text-yellow-100">Delegate</h2>
              </div>
              <p className="text-yellow-200 text-sm mb-4">Urgent & Not Important</p>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {eisenhowerTasks.delegate.length === 0 ? (
                  <p className="text-yellow-300 text-sm italic">No tasks to delegate</p>
                ) : (
                  eisenhowerTasks.delegate.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={deleteTask}
                      onEdit={handleEditTask}
                      onStatusChange={updateTaskStatus}
                      onProgressChange={updateTaskProgress}
                      onTimeChange={updateTaskTime}
                    />
                  ))
                )}
              </div>
            </div>

            {/* ELIMINATE */}
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 rounded-lg border-2 border-slate-500 p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="text-slate-400" size={24} />
                <h2 className="text-2xl font-bold text-slate-100">Eliminate</h2>
              </div>
              <p className="text-slate-300 text-sm mb-4">Not Urgent & Not Important</p>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {eisenhowerTasks.eliminate.length === 0 ? (
                  <p className="text-slate-400 text-sm italic">No tasks to eliminate</p>
                ) : (
                  eisenhowerTasks.eliminate.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={deleteTask}
                      onEdit={handleEditTask}
                      onStatusChange={updateTaskStatus}
                      onProgressChange={updateTaskProgress}
                      onTimeChange={updateTaskTime}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Kanban View */}
        {view === 'kanban' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* TO-DO */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
                <AlertCircle size={20} className="text-blue-400" />
                <h3 className="font-bold text-white">To-do ({kanbanTasks.todo.length})</h3>
              </div>
              <div className="space-y-3 max-h-screen overflow-y-auto">
                {kanbanTasks.todo.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    onEdit={handleEditTask}
                    onStatusChange={updateTaskStatus}
                    onProgressChange={updateTaskProgress}
                    onTimeChange={updateTaskTime}
                  />
                ))}
              </div>
            </div>

            {/* IN PROGRESS */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
                <Clock size={20} className="text-yellow-400" />
                <h3 className="font-bold text-white">In Progress ({kanbanTasks.inprogress.length})</h3>
              </div>
              <div className="space-y-3 max-h-screen overflow-y-auto">
                {kanbanTasks.inprogress.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    onEdit={handleEditTask}
                    onStatusChange={updateTaskStatus}
                    onProgressChange={updateTaskProgress}
                    onTimeChange={updateTaskTime}
                  />
                ))}
              </div>
            </div>

            {/* DONE */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
                <CheckCircle2 size={20} className="text-green-400" />
                <h3 className="font-bold text-white">Done ({kanbanTasks.done.length})</h3>
              </div>
              <div className="space-y-3 max-h-screen overflow-y-auto">
                {kanbanTasks.done.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    onEdit={handleEditTask}
                    onStatusChange={updateTaskStatus}
                    onProgressChange={updateTaskProgress}
                    onTimeChange={updateTaskTime}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-700">
                <tr className="text-slate-300 text-left">
                  <th className="pb-3 font-semibold">Task</th>
                  <th className="pb-3 font-semibold">Business</th>
                  <th className="pb-3 font-semibold">Managed By</th>
                  <th className="pb-3 font-semibold">Priority</th>
                  <th className="pb-3 font-semibold">Deadline</th>
                  <th className="pb-3 font-semibold">Progress</th>
                  <th className="pb-3 font-semibold">Time</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredTasks.map(task => (
                  <tr key={task.id} className="hover:bg-slate-700 transition-colors">
                    <td className="py-3 text-white font-medium">{task.title}</td>
                    <td className="py-3 text-slate-300 text-xs">{task.business}</td>
                    <td className="py-3 text-blue-300 text-xs font-semibold">{task.managedBy}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${
                        task.priority === 'high' ? 'bg-red-900 text-red-200' :
                        task.priority === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                        'bg-green-900 text-green-200'
                      }`}>
                        {task.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300 text-xs">{task.deadline || '-'}</td>
                    <td className="py-3">
                      <div className="w-16 bg-slate-700 rounded h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded transition-all" 
                          style={{width: `${task.progress}%`}}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-400">{task.progress}%</span>
                    </td>
                    <td className="py-3 text-slate-300 text-xs">{task.timeSpent}h / {task.timeEstimate}h</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${
                        task.status === 'done' ? 'bg-green-900 text-green-200' :
                        task.status === 'inprogress' ? 'bg-yellow-900 text-yellow-200' :
                        'bg-blue-900 text-blue-200'
                      }`}>
                        {task.status === 'done' ? 'Done' : task.status === 'inprogress' ? 'Progress' : 'To-do'}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        <button onClick={() => handleEditTask(task)} className="p-1 hover:bg-slate-600 rounded">
                          <Edit2 size={14} className="text-blue-400" />
                        </button>
                        <button onClick={() => deleteTask(task.id)} className="p-1 hover:bg-slate-600 rounded">
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTasks.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <p>No tasks found. Create one to get started!</p>
              </div>
            )}
          </div>
        )}

        {/* Calendar View */}
        {view === 'calendar' && (
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Tasks by Deadline</h3>
            <div className="space-y-4">
              {filteredTasks
                .filter(t => t.deadline)
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .map(task => (
                  <div key={task.id} className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{task.title}</h4>
                      <p className="text-sm text-slate-400">{task.business}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{task.deadline}</p>
                      <p className="text-xs text-slate-400">{task.category}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEditTask(task)} className="p-2 hover:bg-slate-600 rounded">
                        <Edit2 size={16} className="text-blue-400" />
                      </button>
                      <button onClick={() => deleteTask(task.id)} className="p-2 hover:bg-slate-600 rounded">
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              {filteredTasks.filter(t => t.deadline).length === 0 && (
                <p className="text-center text-slate-400 py-8">No tasks with deadlines</p>
              )}
            </div>
          </div>
        )}

        {/* Monthly Goals Section */}
        <div className="mt-8 bg-slate-800 rounded-lg border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">Monthly Goals</h3>
            <button
              onClick={() => setShowGoalModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition-all"
            >
              <Plus size={16} /> Add Goal
            </button>
          </div>
          
          <div className="space-y-2">
            {monthlyGoals.length === 0 ? (
              <p className="text-slate-400 italic">No goals yet. Set some to keep motivated!</p>
            ) : (
              monthlyGoals.map(goal => (
                <div key={goal.id} className="flex items-center gap-3 p-3 bg-slate-700 rounded hover:bg-slate-600 transition-colors">
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => toggleGoal(goal.id)}
                    className="w-5 h-5 cursor-pointer accent-blue-500"
                  />
                  <span className={`flex-1 ${goal.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                    {goal.text}
                  </span>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-1 hover:bg-slate-600 rounded"
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <Modal
        show={showModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        onClose={() => { setShowModal(false); setEditingTask(null); resetForm(); }}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Task Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none"
              placeholder="What do you need to do?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none h-24 resize-none"
              placeholder="Add details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Business *</label>
              <select
                value={formData.business}
                onChange={(e) => setFormData({...formData, business: e.target.value})}
                className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none"
              >
                {businesses.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Managed By *</label>
              <select
                value={formData.managedBy}
                onChange={(e) => setFormData({...formData, managedBy: e.target.value})}
                className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none"
              >
                {managers.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="urgent"
                checked={formData.urgent}
                onChange={(e) => setFormData({...formData, urgent: e.target.checked})}
                className="w-5 h-5 accent-red-500 cursor-pointer"
              />
              <label htmlFor="urgent" className="text-white font-semibold cursor-pointer">Mark as Urgent</label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Time Estimate (hours)</label>
              <input
                type="number"
                value={formData.timeEstimate}
                onChange={(e) => setFormData({...formData, timeEstimate: parseInt(e.target.value) || 0})}
                className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none"
                min="0"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddTask}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <Save size={16} /> {editingTask ? 'Update Task' : 'Create Task'}
            </button>
            <button
              onClick={() => { setShowModal(false); setEditingTask(null); resetForm(); }}
              className="flex-1 bg-slate-700 text-white px-4 py-2 rounded font-semibold hover:bg-slate-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Goal Modal */}
      <Modal
        show={showGoalModal}
        title="Add Monthly Goal"
        onClose={() => { setShowGoalModal(false); setNewGoal(''); }}
      >
        <div className="space-y-4">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none"
            placeholder="What's your goal for this month?"
            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
          />
          <div className="flex gap-3">
            <button
              onClick={addGoal}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-all"
            >
              Add Goal
            </button>
            <button
              onClick={() => { setShowGoalModal(false); setNewGoal(''); }}
              className="flex-1 bg-slate-700 text-white px-4 py-2 rounded font-semibold hover:bg-slate-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskDashboard;
