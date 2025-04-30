import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  Switch,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Camera,
  Tag,
  ChevronDown,
  Upload
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { StatusBar } from 'expo-status-bar';
import { EventCategory } from '@/types';

const CATEGORIES: { id: EventCategory; name: string }[] = [
  { id: 'party', name: 'Party' },
  { id: 'concert', name: 'Concert' },
  { id: 'club', name: 'Club' },
  { id: 'bar', name: 'Bar' },
  { id: 'food', name: 'Food' },
  { id: 'outdoor', name: 'Outdoor' },
  { id: 'culture', name: 'Culture' },
  { id: 'sport', name: 'Sport' },
  { id: 'meetup', name: 'Meetup' },
  { id: 'spontaneous', name: 'Spontaneous' },
];

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<EventCategory>('party');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSpontaneous, setIsSpontaneous] = useState(false);
  
  const handleCreateEvent = () => {
    // Implementation for event creation
    console.log({
      title,
      description,
      location,
      category,
      date,
      time,
      isPublic,
      isSpontaneous,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setLocation('');
    setCategory('party');
    setDate('');
    setTime('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
      >
        <Text style={styles.title}>Create Event</Text>
        
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Add a title for your event"
              placeholderTextColor={Colors.gray[400]}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="What's your event about?"
              placeholderTextColor={Colors.gray[400]}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={20} color={Colors.primary[500]} />
              <TextInput
                style={styles.iconInput}
                value={location}
                onChangeText={setLocation}
                placeholder="Where is your event?"
                placeholderTextColor={Colors.gray[400]}
              />
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.buttonText}>Map</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.picker}>
              <Text style={styles.pickerText}>
                {CATEGORIES.find(cat => cat.id === category)?.name || 'Select category'}
              </Text>
              <ChevronDown size={20} color={Colors.gray[500]} />
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesScroll}
              contentContainerStyle={styles.categoriesContainer}
            >
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    category === cat.id && styles.categoryChipActive
                  ]}
                  onPress={() => setCategory(cat.id)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      category === cat.id && styles.categoryChipTextActive
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.rowGroup}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: Layout.spacing.md }]}>
              <Text style={styles.label}>Date</Text>
              <View style={styles.inputWithIcon}>
                <Calendar size={20} color={Colors.primary[500]} />
                <TextInput
                  style={styles.iconInput}
                  value={date}
                  onChangeText={setDate}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor={Colors.gray[400]}
                />
              </View>
            </View>
            
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Time</Text>
              <View style={styles.inputWithIcon}>
                <Clock size={20} color={Colors.primary[500]} />
                <TextInput
                  style={styles.iconInput}
                  value={time}
                  onChangeText={setTime}
                  placeholder="HH:MM AM/PM"
                  placeholderTextColor={Colors.gray[400]}
                />
              </View>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Add Cover Image</Text>
            <TouchableOpacity style={styles.imageUpload}>
              <Camera size={24} color={Colors.gray[400]} />
              <Text style={styles.uploadText}>Tap to add photo</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.switchGroup}>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Make event public</Text>
              <Switch
                value={isPublic}
                onValueChange={setIsPublic}
                trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
                thumbColor={isPublic ? Colors.primary[500] : Colors.gray[100]}
                ios_backgroundColor={Colors.gray[300]}
              />
            </View>
            
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>This is a spontaneous event</Text>
              <Switch
                value={isSpontaneous}
                onValueChange={setIsSpontaneous}
                trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
                thumbColor={isSpontaneous ? Colors.primary[500] : Colors.gray[100]}
                ios_backgroundColor={Colors.gray[300]}
              />
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateEvent}
            activeOpacity={0.8}
          >
            <Upload size={20} color={Colors.light.text} />
            <Text style={styles.createButtonText}>Create Event</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    marginBottom: Layout.spacing.lg,
    color: Colors.light.text,
  },
  formContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
      default: {
        shadowColor: Colors.gray[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      },
    }),
  },
  inputGroup: {
    marginBottom: Layout.spacing.lg,
  },
  rowGroup: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: Layout.spacing.xs,
    color: Colors.gray[700],
  },
  input: {
    backgroundColor: Colors.gray[50],
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.light.text,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
  },
  iconInput: {
    flex: 1,
    padding: Layout.spacing.md,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.light.text,
  },
  iconButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
  },
  buttonText: {
    color: Colors.light.text,
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
  },
  pickerText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.light.text,
  },
  categoriesScroll: {
    marginTop: Layout.spacing.sm,
  },
  categoriesContainer: {
    paddingVertical: Layout.spacing.xs,
  },
  categoryChip: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    backgroundColor: Colors.gray[100],
    borderRadius: Layout.borderRadius.full,
    marginRight: Layout.spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary[500],
  },
  categoryChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[700],
  },
  categoryChipTextActive: {
    color: Colors.light.text,
  },
  imageUpload: {
    height: 120,
    backgroundColor: Colors.gray[50],
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: Layout.borderRadius.md,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    marginTop: Layout.spacing.sm,
    color: Colors.gray[500],
    fontFamily: 'Inter-Medium',
  },
  switchGroup: {
    marginBottom: Layout.spacing.lg,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  switchLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.light.text,
  },
  createButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: Colors.light.text,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginLeft: Layout.spacing.sm,
  },
});