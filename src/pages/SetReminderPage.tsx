import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Bell, Trash2, Edit2, Calendar } from 'lucide-react';
import { useToast } from '../components/ui/toast';

export function SetReminderPage() {
  const { reminders, addReminder, deleteReminder } = useApp();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    serviceType: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.serviceType || !formData.date || !formData.time) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    const reminder = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    addReminder(reminder);
    addToast('Reminder set successfully!', 'success');
    setFormData({ serviceType: '', date: '', time: '', notes: '' });
  };

  const handleDelete = (id: string) => {
    deleteReminder(id);
    addToast('Reminder deleted', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#4FC3F7] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-10 h-10" />
            <h1 className="text-4xl">Set a Reminder</h1>
          </div>
          <p className="text-lg opacity-90">Never miss your home service appointments</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Reminder Form */}
          <Card className="p-6">
            <h2 className="text-2xl mb-6">Create New Reminder</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Service Type *</label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electrician">Electrician</SelectItem>
                    <SelectItem value="AC Service">AC Service</SelectItem>
                    <SelectItem value="Plumber">Plumber</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2">Date *</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Time *</label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Notes (Optional)</label>
                <Input
                  placeholder="Additional details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full bg-[#4FC3F7] hover:bg-[#3DAED8] text-white">
                <Bell className="w-4 h-4 mr-2" />
                Set Reminder
              </Button>
            </form>
          </Card>

          {/* Reminders List */}
          <div>
            <Card className="p-6">
              <h2 className="text-2xl mb-6">Upcoming Reminders</h2>
              
              {reminders.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No reminders set yet</p>
                  <p className="text-sm text-gray-400 mt-2">Create your first reminder to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reminders
                    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
                    .map((reminder) => {
                      const reminderDate = new Date(reminder.date + ' ' + reminder.time);
                      const isPast = reminderDate < new Date();
                      
                      return (
                        <Card key={reminder.id} className={`p-4 ${isPast ? 'opacity-60' : ''}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Bell className="w-5 h-5 text-[#4FC3F7]" />
                                <h3 className="text-lg">{reminder.serviceType}</h3>
                              </div>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(reminder.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                                <p className="ml-6">
                                  Time: {reminder.time}
                                </p>
                                {reminder.notes && (
                                  <p className="ml-6 text-gray-500 italic">
                                    {reminder.notes}
                                  </p>
                                )}
                              </div>
                              {isPast && (
                                <p className="text-xs text-red-500 mt-2">Past due</p>
                              )}
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(reminder.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
