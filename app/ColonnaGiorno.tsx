import React from "react";
import { Lezione } from "./types/lezione";
import { Text, View } from "react-native";
import ContenitoreLezione from "./ContenitoreLezione";

const ColonnaGiorno = ({
  giorno,
  lezioni,
  matricola_pari,
}: {
  giorno: string;
  lezioni: Lezione[];
  matricola_pari: boolean;
}) => {
  function filtraLezioni(giorno: string, matricola_pari: boolean): Lezione[] {
    let lezioniFiltrate = lezioni.filter((lezione) =>
      lezione.nome_giorno.includes(giorno.toLowerCase())
    );

    if (matricola_pari) {
      lezioniFiltrate = lezioniFiltrate.filter(
        (lezione) => !lezione.corso.toLowerCase().includes("dispari")
      );
    } else {
      lezioniFiltrate = lezioniFiltrate.filter((lezione) =>
        lezione.corso.toLowerCase().includes("dispari")
      );
    }

    return lezioniFiltrate;
  }

  return (
    <View className="bg-[#303030] p-2 flex flex-col">
      <Text className="font-bold text-yellow-300 text-xl text-center py-2">
        {giorno}
      </Text>
      {filtraLezioni(giorno, matricola_pari)?.length > 0 ? (
        filtraLezioni(giorno, matricola_pari)?.map((lezione, idx) => (
          <View key={idx}>
            <ContenitoreLezione key={idx} lezione={lezione} />
          </View>
        ))
      ) : (
        <View>
          <Text className="text-white text-base text-center">
            Nessuna lezione
          </Text>
        </View>
      )}
    </View>
  );
};

export default ColonnaGiorno;
