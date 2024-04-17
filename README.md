Projektarbeit Spiel "DOBBLE"
============================

Name:           Michael Jost (https://github.com/michajost)
Testdatum:      02.01.2024
Abgabedatum:    05.01.2024

Online:         https://mjpro.de/dobble/


Spielbeschreibung
-----------------

Bei DOBBLE gibt es grundsätzlich zwei Arten von Karten. Eine in der "Mitte" und eine "auf der Hand". Jede Karte hat 8 Symbole, von denen immer genau eines auf einer beliebigen anderen Karte zu finden ist. Sinn des Spieles ist es möglichst schnell das einzige Symbol zu finden, dass sowohl auf der Hand-, als auch auf der Mittel-Karte zu finden ist. 

DOBBLE wird normalerweise mit mehreren Personen gespielt. Um es auch für Einzelspieler spannend zu machen, habe ich eine Zeitbegrenzung (z.B. 60 Sekunden) eingebaut, innerhalb derer möglichst viele Symbolübereinstimmungen gefunden werden müssen. Das Ergebnis wird als Highscore gespeichert, der dann "geknackt" werden kann.

Spielrunde
----------

Bei Klick auf "Runde starten" werden zwei zufällige Karten angezeigt und der Countdown beginnt. Ist eine Übereinstimmung gefunden worden, muss das Symbol im unteren Bereich angeklickt werden. Ist es richtig, geht der Zähler hoch und es werden zwei neue Karten ausgegeben. Wurde falsch geklickt, gibt es eine Zeitstrafe (z.B. 1,3 Sekunden), in der kein Symbol ausgewählt werden kann. Nach Ablauf der Zeit wird eine Nachricht angezeigt, ob der Highscore geknackt wurde.

Projektarbeit Anforderungen
---------------------------

Arbeit mit Events:
    onload-Event beim Request
    onclick-Events Start-Button und auf Symbolen in der unteren Karte

Nutzung von Webstorage oder Cookies
    Der Highscore wird von/im localStorage ausgelesen/gespeichert

Erzeugung und Integration von DOM-Teilbäumen
    z.B. in Funktion getCard() - Hier werden die Karten mit Symbolen gefüllt und ausgegeben

AJAX
    Die Symbole und Karten werden mit AJAX aus der cards.json gezogen