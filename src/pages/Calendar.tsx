import React, { useState } from 'react';
import { usePost } from '../contexts/PostContext';
import EditPostModal from '../components/EditPostModal';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  format,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { Link } from 'react-router-dom';

const Calendar: React.FC = () => {
  const { posts } = usePost();
  const { createPost } = usePost();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [editingPost, setEditingPost] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const monthFormat = "MMMM yyyy";

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // Create a new post with the selected date
    const newPost = {
      id: 'new',
      content: '',
      scheduledFor: date,
      status: 'scheduled'
    };
    setEditingPost(newPost);
  };

  const handlePostClick = (post: any) => {
    setEditingPost(post);
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">View your scheduled posts in calendar format</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 min-w-[200px] text-center">
              {format(currentDate, monthFormat)}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <Link
            to="/compose"
            className="bg-gradient-to-r from-[#38b6ff] to-[#2da5ef] text-white px-6 py-3 rounded-lg font-medium hover:from-[#2da5ef] hover:to-[#1e94d4] transition-all flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(new Date());

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="p-4 text-center text-sm font-medium text-gray-500">
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }

    return <div className="grid grid-cols-7 bg-gray-50 rounded-t-lg">{days}</div>;
  };

  const renderCells = () => {
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dayPosts = posts.filter(post => 
          isSameDay(new Date(post.scheduledFor), cloneDay)
        );

        days.push(
          <div
            key={day.toString()}
            className={`min-h-[120px] p-2 border-r border-b border-gray-200 ${
              !isSameMonth(day, monthStart) ? 'bg-gray-50' : 'bg-white'
            } cursor-pointer hover:bg-gray-50`}
            onClick={() => handleDateClick(cloneDay)}
          >
            <div className={`text-sm font-medium mb-2 ${
              !isSameMonth(day, monthStart) ? 'text-gray-400' : 'text-gray-900'
            }`}>
              {format(day, dateFormat)}
            </div>
            <div className="space-y-1">
              {dayPosts.slice(0, 3).map(post => (
                <div
                  key={post.id}
                  className={`text-xs p-2 rounded cursor-pointer truncate ${
                    post.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                    post.status === 'posted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePostClick(post);
                  }}
                  title={post.content}
                >
                  <div className="flex items-center">
                    {post.status === 'scheduled' && <Clock className="w-3 h-3 mr-1" />}
                    {post.status === 'posted' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {post.status === 'failed' && <AlertCircle className="w-3 h-3 mr-1" />}
                    <span className="truncate">
                      {format(new Date(post.scheduledFor), 'h:mm a')} - {post.content}
                    </span>
                  </div>
                </div>
              ))}
              {dayPosts.length > 3 && (
                <div className="text-xs text-gray-500 px-2">
                  +{dayPosts.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {renderHeader()}
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {renderDays()}
        {renderCells()}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-100 rounded mr-2"></div>
          <span className="text-gray-600">Scheduled</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
          <span className="text-gray-600">Posted</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-100 rounded mr-2"></div>
          <span className="text-gray-600">Failed</span>
        </div>
      </div>

      {/* Edit/Create Post Modal */}
      {editingPost && (
        <EditPostModal
          post={editingPost}
          isOpen={!!editingPost}
          onClose={() => setEditingPost(null)}
        />
      )}
    </div>
  );
};

export default Calendar;