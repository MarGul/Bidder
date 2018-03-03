<template>
    <div class="faq-view">
        <app-hero>
			<h1 slot="title">Vanliga frågor &amp; svar</h1>
			<p slot="left">
				Hoppas att du hittar svaret du söker här. Annars kan du alltid kontakta oss.<br>
                Vi uppskattar all feedback vi kan få och kommer att återkomma till dig så fort som möjligt.
			</p>
			<img slot="right" src="/images/help.png" alt="" width="150px">
		</app-hero>

        <div class="container">
            <div class="content">
                
                <app-faq-question>
                    <span slot="question">Vad är GoBid?</span>
                    <p slot="answer">
                        GoBid är en plattform som hjälper personer och företag att mötas för att utföra arbete som ni inte kan/vill utföra själva. 
                        Vill du veta mer så klicka <router-link class="is-link" to="/about">här</router-link>.
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Hur blir jag medlem?</span>
                    <p slot="answer">
                        Du blir enkelt medlem hos oss genom att skapa en profil <span class="is-link" @click="register">här</span>. 
                        Det tar 1 minut och efter det så kan du antingen skapa den tjänst som du vill ha utförd eller hitta en 
                        uppgift som passar just dig.
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Vad förbinder jag mig till?</span>
                    <p slot="answer">
                        Ingenting alls. Vi erbjuder dig en plattform där du kan hitta, kommunicera och avtala om den uppgiften som ni har enats 
                        om skall utföras. Läs mer på våra <router-link class="is-link" to="/terms">Allmänna villkor</router-link>. 
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Vad kostar det?</span>
                    <p slot="answer">
                        Att lägga ut en tjänst på GoBid är helt kostnadsfritt. Om du som företag vinner budgivningen för att få utföra tjänsten 
                        tar vi ut en liten procentuell avgift på totalbeloppet. Detta medför att vi inte har några fasta kostnader. Du betalar 
                        en liten “hittelön” när du tjänar mer pengar.
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Hur kommer jag i kontakt med GoBid?</span>
                    <p slot="answer">
                        Skicka ett meddelande till oss genom att klicka <span class="is-link" @click="feedback('other')">här</span>. Vi uppskattar
                        all feedback som vi kan få och återkommer så fort vi kan.
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Jag hittar ingen kategori som matchar mig tjänst</span>
                    <p slot="answer">
                        Vi lägger hela tiden till nya kategorier. Vi vill se till att där finns företag som kan buda på en kategori innan vi lägger 
                        till den. Skicka gärna förslag på kategorier som du vill att ska lägga till. Du kan skicka förslag till oss 
                        <span class="is-link" @click="feedback('categoryDontExist')">här</span>.
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Jag kan inte välja min stad</span>
                    <p slot="answer">
                        Vi är en nystartad plattform. Tanken är att vi inom kort ska täcka ett mycket större område. Skicka gärna förslag på områden 
                        som du vill att vi ska lägga till. Du kan skicka förslag till oss 
                        <span class="is-link" @click="feedback('locationDontExist')">här</span>.
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Finns det några avtal som gäller vid arbetet?</span>
                    <p slot="answer">
                        På GoBid så förser vi er med ett standardavtal som  kan använda er av för att skapa trygghet vid tjänsten. Det är inget 
                        tvång att använda just det avtalet som GoBid har tagit fram men vi rekommenderar att någon form av avtal sluts för både 
                        konsumenten och företagets trygghet.
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Hur lägger jag upp en tjänst?</span>
                    <p slot="answer">
                        För att skapa en tjänst så behöver du först <span class="is-link" @click="register">registrera</span> dig om du inte gjort det än. 
                        När du har registrerat dig och loggat in kan du trycka på länken "Skapa tjänst" uppe i menyn. Du följer sedan instruktionerna om 
                        vad som behöver finnas med i tjänsten.  
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Hur får jag fler jobb?</span>
                    <p slot="answer">
                        Har du tittat igenom alla tjänster som ligger i din stad och kunskapsområde? Du kanske kan arbeta i fler städer än din huvudort?
                        Glöm inte att prenumerera så att du får ett mail varje gång en tjänst som matchar dina kunskapsområden skapas. När du har hittat
                        en tjänst som passar dig lägger du ett gratis bud om att få utföra tjänsten.
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Hur redigerar jag min tjänst?</span>
                    <p slot="answer">
                        Har du tittat igenom alla tjänster som ligger i din stad och kunskapsområde? Du kanske kan arbeta i fler städer än din huvudort?
                        Glöm inte att prenumerera så att du får ett mail varje gång en tjänst som matchar dina kunskapsområden skapas. När du har hittat
                        en tjänst som passar dig lägger du ett gratis bud om att få utföra tjänsten.
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Kan jag ändra mitt bud?</span>
                    <p slot="answer">
                        Du kan inte redigera ett redan lagt bud. Däremot kan du lägga flera bud på samma tjänst. 
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Vad händer när jag accepterat ett bud?</span>
                    <p slot="answer">
                        När du har accepterat ett bud så skapas ett projekt mellan dig och företaget som la budet. Då har ni 14 dagar på er att starta 
                        projektet. Detta är för bådas trygghet. Det är ett ypperligt tillfälle att lära känna varandra mer och finslipa de sista 
                        detaljerna. 
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Vad händer när jag vunnit en budgivning?</span>
                    <p slot="answer">
                        När ditt bud har blivit accepterat så skapas ett projekt mellan dig och personen som la ut tjänsten. Då har ni 14 dagar på er 
                        att starta projektet. Detta är för bådas trygghet. Det är ett ypperligt tillfälle att lära känna varandra mer och finslipa de 
                        sista detaljerna. 
                    </p>
                </app-faq-question>

                <app-faq-question>
                    <span slot="question">Hur tar jag bort min profil?</span>
                    <p slot="answer">
                        Vi hjälper dig snabbt och enkelt att ta bort din profil om du väljer att inte stanna kvar i hos oss på GoBid. Hör av dig till 
                        oss så tar vi hand om det. Du kan kontakta oss genom att klicka <span class="is-link" @click="feedback('other')">här</span>.
                    </p>
                </app-faq-question>
            </div>
        </div>
    </div>
</template>

<script>
import appFaqQuestion from '../components/Includes/FAQquestion'

export default {
    components: {
        appFaqQuestion
    },
    methods: {
        register() {
            this.$store.dispatch('openModal', {component: 'register', data: {closeClass: 'white'}});
        },
        feedback(component) {
            this.$store.dispatch('openModal', {
                component: 'feedback', 
                data: {
                    closeClass: 'white',
                    subject: component
                }
            });
        }
    }
}
</script>

