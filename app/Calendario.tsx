import React from "react";
import { ScrollView } from "react-native";
import { Lezione } from "./types/lezione";
import { giorniSettimanali } from "./types/giorniSettimanali";
import ColonnaGiorno from "./ColonnaGiorno";

const Calendario = ({
  lezioni,
  matricola_pari,
}: {
  lezioni: Lezione[];
  matricola_pari: boolean;
}) => {
  return (
    <ScrollView>
      {giorniSettimanali.map((giorno, idx) => (
        <ColonnaGiorno
          key={idx}
          giorno={giorno}
          lezioni={lezioni}
          matricola_pari={matricola_pari}
        />
      ))}
    </ScrollView>
  );
};

export default Calendario;
