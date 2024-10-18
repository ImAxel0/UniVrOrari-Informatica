import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Lezione } from "./types/lezione";
import Calendario from "./Calendario";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons/faSquareCheck";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons/faRotate";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faToggleOn } from "@fortawesome/free-solid-svg-icons/faToggleOn";
import { faToggleOff } from "@fortawesome/free-solid-svg-icons/faToggleOff";

export default function Index() {
  const [data, setData] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [lezioni, setLezioni] = useState<Lezione[]>([]);
  const [matricola_pari, setMatricola_pari] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData(new Date());
    fetchLessons(new Date());
  }, []);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    const newDate = getFirstDayOfWeek(currentDate);
    setShowPicker(Platform.OS === "ios"); // On Android, hide after picking
    setData(newDate);
    fetchLessons(newDate);
  };

  // Function to get the first day of the week (Monday) based on the current date
  const getFirstDayOfWeek = (date: Date) => {
    const day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diff = (day === 0 ? -6 : 1) - day; // Calculate the difference to get Monday (1)
    const firstDay = new Date(date);
    firstDay.setDate(date.getDate() + diff);
    return firstDay;
  };

  const goToNextWeek = () => {
    if (data) {
      const firstDayOfCurrentWeek = getFirstDayOfWeek(data); // Get current week's Monday
      const nextWeekStart = new Date(firstDayOfCurrentWeek);
      nextWeekStart.setDate(nextWeekStart.getDate() + 7); // Move forward 7 days
      setData(nextWeekStart); // Update the state
      fetchLessons(nextWeekStart);
    }
  };

  const goToPrevWeek = () => {
    if (data) {
      const firstDayOfCurrentWeek = getFirstDayOfWeek(data); // Get current week's Monday
      const previousWeekStart = new Date(firstDayOfCurrentWeek);
      previousWeekStart.setDate(previousWeekStart.getDate() - 7); // Move backward 7 days
      setData(previousWeekStart); // Update the state
      fetchLessons(previousWeekStart);
    }
  };

  async function fetchLessons(data_selezionata: Date) {
    setIsLoading(true);

    const endpoint = `https://logistica.univr.it/PortaleStudentiUnivr/grid_call.php?&form-type=corso&include=corso&txtcurr=1+-+Matricole+Pari&anno=2024&corso=420&anno2%5B%5D=999%7C1&anno2%5B%5D=999%7C1&date=${data_selezionata
      ?.toLocaleDateString()
      .replace(
        /\//g,
        "-"
      )}&periodo_didattico=&_lang=it&list=&week_grid_type=-1&ar_codes_=&ar_select_=&col_cells=0&empty_box=0&only_grid=0&highlighted_date=0&all_events=0&faculty_group=0#`;

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      const celle = data["celle"];

      const fetchedLezioni = celle.map((lezione: any) => ({
        corso: lezione["titolo_lezione"],
        aula: lezione["aula"],
        docente: lezione["docente"],
        giorno: lezione["GiornoCompleto"],
        nome_giorno: lezione["nome_giorno"],
        orario: lezione["orario"],
        annullata: lezione["Annullato"],
      }));
      setLezioni(fetchedLezioni);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView className="bg-[#1d1d1d] h-full">
      {isLoading ? (
        <ActivityIndicator size={100} color={"cyan"} className="flex-1" />
      ) : (
        <>
          <View className="flex flex-row justify-between p-3">
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <View className="flex flex-row items-center gap-x-2">
                <FontAwesomeIcon icon={faCalendarAlt} color="white" size={24} />
                <Text className="text-white">
                  Settimana del {getFirstDayOfWeek(data).toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
            <View className="flex flex-row gap-x-6">
              <TouchableOpacity
                onPress={() => setMatricola_pari(!matricola_pari)}
              >
                <FontAwesomeIcon
                  icon={matricola_pari ? faToggleOn : faToggleOff}
                  color="white"
                  size={24}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => fetchLessons(data)}>
                <FontAwesomeIcon icon={faRotate} color="white" size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <Calendario lezioni={lezioni} matricola_pari={matricola_pari} />
          <View className="flex flex-row justify-around">
            <TouchableOpacity onPress={goToPrevWeek} className="p-3">
              <FontAwesomeIcon icon={faArrowLeft} color="white" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToNextWeek} className="p-3">
              <FontAwesomeIcon icon={faArrowRight} color="white" size={24} />
            </TouchableOpacity>
          </View>
        </>
      )}
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          onChange={handleDateChange}
        />
      )}
    </SafeAreaView>
  );
}

library.add(fab, faSquareCheck);
