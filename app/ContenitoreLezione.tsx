import React from "react";
import { Lezione } from "./types/lezione";
import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBuilding } from "@fortawesome/free-regular-svg-icons/faBuilding";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons/faCalendarDays";

const ContenitoreLezione = ({ lezione }: { lezione: Lezione }) => {
  return (
    <View className="bg-[#181818] m-1 p-5 rounded-md border border-dashed border-gray-500">
      <View className="flex flex-col gap-y-2">
        <Text
          className="text-white text-lg font-semibold"
          style={
            lezione.annullata == true && {
              color: "red",
              textDecorationLine: "line-through",
            }
          }
        >
          {lezione.corso}
        </Text>
        <View className="flex flex-row gap-x-2 items-center">
          <FontAwesomeIcon icon={faBuilding} color="white" />
          <Text className="text-gray-300">{lezione.aula}</Text>
        </View>
        <View className="flex flex-row gap-x-2 items-center">
          <FontAwesomeIcon icon={faUser} color="white" />
          <Text className="text-gray-400">{lezione.docente}</Text>
        </View>
        <View className="flex flex-row gap-x-2 items-center">
          <FontAwesomeIcon icon={faClock} color="white" />
          <Text className="text-green-300">{lezione.orario}</Text>
        </View>
        <View className="flex flex-row gap-x-2 items-center">
          <FontAwesomeIcon icon={faCalendarDays} color="white" />
          <Text className="text-cyan-300">{lezione.giorno}</Text>
        </View>
      </View>
    </View>
  );
};

export default ContenitoreLezione;
