export function getDfwi(course) {
    if (dfwi[course]!=undefined)
        return dfwi[course]
    else
        return 'N/A'
}

const dfwi=
{ 
    "HIST121":43.4,"DAWA111":42.8,"ARAB100":40.4,"ARAB200":30.1,"MAGT101":37.8,"CHEM101":39.7,"MATH102":55.7,
    "MATH101":45.2,"PHYS191":46.7,"ENGL203":22.9,"CMPS151":57,"ENGL202":24.7,"PHYS192":31.5,"MATH211":45.7,
    "GENG106":49.2,"CMPS251":51.1,"GENG107":26.3,"CMPS205":42.3,"GENG200":34.2,"MATH231":43,"MATH217":38.3,
    "ELEC351":49.7,"PHYS193":31.3,"CMPS303":47.4,"GENG360":38,"CMPE263":22.7,"CMPS385":30.2,"MECH223":46.7,
    "CMPS350":41,"CMPS323":32.8,"CHEM209":25.8,"CHEM103":9.9,"ELEC231":37.6,"CMPS351":29.8,"GENG300":22.8,
    "CMPS405":31.7,"CMPE364":35,"PHYS194":17.6,"ELEC201":36,"ELEC325":52.1,"CMPE476":30.9,"GENG111":26.6,
    "CHME212":34.8,"ELEC352":38.5,"MECH330":58.8,"CHEM104":30,"CHME202":33.7,"GENG231":16.5,"ELEC321":36.4,
    "CMPE457":18.6,"CHEM102":21.7,"ELEC341":43.9,"CHME213":28.9,"CVEN212":40.4,"MECH210":68.8,"ELEC261":27.8,
    "ELEC202":30.9,"MECH441":44.2,"IENG337":30.5,"CVEN230":28.3,"MECH322":34.7,"MECH344":32,"CVEN380":31.9,
    "MECH222":25,"MECH221":58.3,"IENG360":26,"MECH230":27.1,"ELEC353":22.4,"CVEN381":15.9,"IENG357":16.4,
    "CHME314":19.4,"CVEN214":42.3,"IENG210":25,"ELEC342":18.9,"MECH241":31.2,"CMPS499":8.5,"ELEC262":11.6,
    "IENG325":27.6,"MECH224":14.8,"CHME315":14.3,"CVEN220":24.1,"CVEN213":35,"MECH213":75,"CVEN320":23.1,
    "CMPS485":16.7,"IENG452":25,"CMPE499":4.3,"CHME458":7.7,"IENG310":6.3,"MECH361":50,"ELEC203":4.6,
    "CVEN360":6.7,"IENG350":50,"CHME327":3.6,"CVEN350":9.5,"IENG460":6.2,"IENG496":7.1,"CHME422":1.6,
    "CHME325":0,"IENG497":0,"CVEN402":0,"MECE212":0,"MECH448":0,"CVEN401":0,"IENG260":0,"MECH487":0,
    "MECH488":0,"ELEC499":0,"CHME426":0
}