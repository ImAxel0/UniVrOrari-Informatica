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
      lezione.nome_giorno?.toLowerCase().includes(giorno.toLowerCase())
    );

    lezioniFiltrate = lezioniFiltrate.filter((lezione) => {
      const corso = lezione.corso.toLowerCase();
      const contienePari = corso.includes("pari");
      const contieneDispari = corso.includes("dispari");

      if (!contienePari && !contieneDispari) {
        return true;
      }

      if (matricola_pari) {
        return contienePari && !contieneDispari;
      }

      return !contienePari || contieneDispari;
    });

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
