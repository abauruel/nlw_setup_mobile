import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Text, ScrollView, Alert } from "react-native";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from '../lib/generateDatesFromYearBeginning'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateDatesFromYearBeginning()
const minimumSummaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

import { api } from '../lib/axios'
import { useEffect, useState, useCallback } from "react";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";
type SummaryProps = Array<{
  id: string
  date: string
  amount: number
  completed: number
}>
export function Home() {
  const { navigate } = useNavigation()
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<SummaryProps | null>(null)

  async function fetchData() {
    try {
      setLoading(false)
      const response = await api.get('/summary')
      setSummary(response.data)
    } catch (error) {
      Alert.alert('Ops', 'Não foi possivel carregar o sumario de habitos')
      console.log(error)
    } finally { setLoading(false) }
  }

  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))
  if (loading) {
    return (<Loading />)
  }
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {
          weekDays.map((weekday, index) => (
            <Text key={`${weekday}-${index}`}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{ width: DAY_SIZE }}
            >
              {weekday}
            </Text>
          ))
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {summary &&
          <View className="flex-row flex-wrap">
            {
              datesFromYearStart.map(date => {
                const dayWithHabits = summary?.find(day => {
                  return dayjs(date).isSame(day.date, 'day')
                })
                return (<HabitDay
                  key={date.toString()}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  onPress={() => navigate('habit', { date: date.toISOString() })}
                />)
              }
              )
            }

            {
              amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill })
                .map((_, index) => (
                  <View key={index}
                    className="bg-zinc-900 rounded-ld border-2 m-1 border-zinc-800 opacity-40"
                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  />))
            }
          </View>}

      </ScrollView>
    </View>
  )
}