<template>
  <v-container class="activity-module">
    <v-row class="activity-header align-center mb-2" no-gutters>
      <v-icon class="ico">
        mdi-format-list-bulleted-square
      </v-icon>
      <div class="activity-title d-flex flex-grow-1 align-center ml-6">
        <h4>Activity</h4>
      </div>
    </v-row>
    <v-row class="activity-list-wrapper align-center mb-3" no-gutters>
      <v-avatar class="mr-4"><v-img :src="profileImg"></v-img></v-avatar>
      <v-text-field
        outlined
        class="comment-text-field"
        placeholder="Write a comments..."
        hide-details
        v-model="newComment"
        @keyup.enter="save"
      >
        <template v-slot:append
          ><v-btn text small color="green" height="24" @click="save"
            >Save</v-btn
          ></template
        >
      </v-text-field>
    </v-row>
    <v-row
      v-for="(comment, i) in orderedActivities"
      :key="i"
      class="mb-3"
      no-gutters
    >
      <v-avatar class="mr-4"><v-img :src="comment.imgSrc"></v-img></v-avatar>
      <div class="comment-container flex-grow-1">
        <p>
          <strong class="mr-2">{{ comment.name }}</strong>
          <span class="date-text">{{ formatDate(comment.createdAt) }}</span>
        </p>
        <div class="text-wrapper">
          <div class="comment-input-wrapper" v-if="isEdit !== i">
            <p class="comment-txt">
              {{ comment.text }}
            </p>
          </div>
          <div class="comment-input-wrapper-editing" v-else>
            <v-text-field
              class="comment-input mb-2"
              v-model="editedComment"
              :dark="isEdit === i"
              rows="1"
              auto-grow
              solo
              hide-details
            ></v-text-field>
          </div>
          <div class="activity-actions" v-if="isEdit !== i">
            <button class="mr-2" @click="toEdit(comment.text, i)">
              Edit
            </button>
            <button @click="deleteComment(comment.id)">Delete</button>
          </div>
          <div class="btn-edit-wrapper" v-if="isEdit === i">
            <v-btn color="green" dark text @click="edit(comment.id)"
              >save</v-btn
            >
            <v-btn icon @click="isEdit = undefined">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
export default {
  name: 'Activity',
  data() {
    return {
      isEdit: undefined,
      profileImg:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIREhUSEBMVFRUVFxcVGBYXGBcVFxcYFRUXFxoYFxcYHSggGBolHRgVITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGjUmHyUuLS4tLTMtLS0tLzItLSstLS0tLS01LS0tLS0tLS0yLS0tLS0tLS0tKy0tKy0tLS0tLf/AABEIAM4A9AMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAQIDBAYAB//EAD4QAAEDAgQDBgQFAgQGAwAAAAECAxEABAUSITEGQVETImFxgZEyocHwFCNCsdFS4QdigvEWM3KissIkQ5L/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/EACwRAAMAAQQBAwEIAwEAAAAAAAABAhEDEiExQSJRgRMyQmFxobHR8FKR4RT/2gAMAwEAAhEDEQA/ANEBTgKUCnAVzmw0CnRSxSgUAIBSxSxSgUAJFLFLFLFADYpYp0UsUANiuinRSxQA2vKeMMb/ABLxCT+U2SlI5KPNX3yrbcdYobe2ISYW6ezT1AI7x9B+9eVspkgcv41P0poaJCSBQ11qTJ86L5ZknSoVW2mu538PvSmy0gMUSTUrDBJFFraw0kjx/c/SiWG4f3J6j5xP0FS6LnTyBbmxIEx1oY4zFenu4YFpIHI/ulJFZTF8My6x9n/b50lY3pLwZdCdaI2SoEe31+/5pptiFHT/AGq21b/yPkCKvJm5wNBmreD4ibZ5KxtMKHVJ3H19KpuiD971DPLnV9mZ7G06FpCkmQRII8aRQrO8CYh2jJQd2zHodR9R6VpVCssFFdQqFQqwoVEoUhFZQqFYqyoVCsUAViK6pCK6gRrQKcBXAUoFMDqUClFLQAlKKWKUCgBAKWliligBIpYpa6gBIpYpYpHFhIKjsASfICaAPLf8Rr/tLkNpOjSQk+Cl6n5ZazttzPWQPrUd7clxa3VbuKUv3OnypincuUeA+ZzfWqRWAinXTr+2/wA4irJbEfL6mh1o/J+/SiFo5ncQgev7ik2azITtrOUmR+k/+38UWtrH8rTcR80p+o+dSWbMmPBXtB1++tGcNYBSR4CPb+IrNcmzeBmD28tidzE+gKT800H4nwuBt971pMCeAdcaP6YUB0BOv/dPvXcUsgp9PrFU54yQqe7B5eq2BM+H3+1VQqFR99KmW+UkeMj2E0NxF2Fe3zmnLJtDroAz4ifIj7FDXl7Eb1Mm4mfX9qrOmZ9/etDBmo4Gu8l1l5OJj1EK+iq9KUK8awO6yPMr/pUP3/ivZpkVm+x+CFQqJQqdQqJVIRXWKhWKsqFQLFAEBFJTyK6gRqxThSCnUwOFKBXCloA6liuFOoA6uFdFOFACRSxXUoFAjooDxte9laORusZB6jX5TR+vPP8AEi/lSWgdtCPFQk+yf3oZU8s89dHLwAqJapUPIf8AiKc6rXzM1Cox7CmWXLR0AEk/ZrQcNKBWVmJ1InlyT/PoaAYRhDj6glIgdToK9AwrhJqMpd73/UI030qKaNYzjIZwltJClSDsnwgf2iieEoBaCh4H2EfOKBOYC5biUqkbx/FHOFwS2Aeg0onsdcrJQuLgMXbTnJwFo+BMKSfdJozi4S41IImJ9IoRxTgxdgIMQQZ6Eaz99agt8EUQMzhT4D6U3XgWM4Z59jyMij/lX8jQrEjKQoc/969JxLg1tZ1cVrvtqKxuPcKO24JSStveeaSOvUeNCaCuTKZ4NITXOio5rVHOyZlUR4Ga9pwS57RltXVI9wK8SQqvT/8AD28C2OznVBOngf7/AL1FDRqVColCp1VEupEQKFQqFWFCoVigCAiupxFdQI1ApRXClFMBaUUlOFAHUorqUUAcKWupRQB1OpBS0xFe+uQ0hS1bJBJ9K8Xxq8Lzylk8ifVRj+fQCtv/AIhYqdLdB5Zl+XIfX1FedOKOUz8Sj+2kfSkaSsIpE606zty4sJG5hI+tK4mBA3ovwe2O2k/p29edHgtdh7EsLcaCQg5UmElQ3ApLnB1dqhTDbjiOyI0UtJ7SCMxMjnB6abVumbYOJE60QtsOAGk+VRNNF0kwHgLLzbSW3lLX3MxKkkZFDdGYiCNRHkaM8PxJHSrNwyEIMVVwA/EfGn94X3SxdiSqOhrB8Tv3Km1rZcy5SAEJnMoHQqPhtoPOt+n4664wwEyCRQlzkN3GDyu07cl5bbzqQjJkS7usx3kkQJ8DHStHhLzj6fzElOmoO3p1Faa4wkH4oPypv4cJGgpVyVLwuzyPjPA+xUVpHdV8qySk161xm2FNKB6T7V5g7amJG1aQ+DLUXJSFangS97N4gnQ/sdz8qzbjJGsevKp8KdKXEkGNQPc8/CqfRmuz25C50O9coUNwa+C0gL7qx3TJ0MdDRNVZjIFColCp1VCugRAa6nEV1AGmpwpopRTEKKcKbThQAtLSCnUAdTqQUooAWoL+6DTanFbJBPtU9Yvj/F0pSGUmf1KjUTskE7ePpQxpZZi8RulO9o+r9ao9dTA8tPlQtDUjMowkbdT5Ul3fpKUoSnuomJMgk7k11iCtWZZ0GwoSNMiXqAlvNsSNBzjr51NwqshQV109qqYk/nKug2/arfDVoezU8F6IdQ2W4P8A9iFqz5tgBkiOc1bXBGfUew4G7KRWgarG8N3GgFa9hdZSa0UuILjIiOZ0FRYE2Q2T11qPiFpaiCkSACOsE845ihmD3j6UFDiJWNApIISrodZy+WtHkaXpDKXYVr1o4jUVkbL8SSpLyEGT3CjNsf6p2jrWnbMCDVSRaHPAChF4sAGiT66B4kvQ0qY4RieKXSruJ1KjEDxNZPErUstKz7mAB0Jj6Vsm8heK3FBIQM2pjnE+mtY3jS+Q68EtGUNyJGylHeOoG3vRHeB3wsgVq50g1CtICqR1ECosxMVtg58m+wi5UghtxQhUFKjtt15b1rMOuye4uZGmu4O+vmI96wOCXQWjs3BMp7s84IkDoYnWtThl12nYqmTq2o9S3OU+xzetYss0aqhXUyqhXQIiNdXGuoA0gpRSUopiHCnCmilFADqWminCgB1KKaKcKAInh12+X968j4ocLjxA2KiRrqQJA+tevu7V5BibYTdQTGQq320CjHrSKkzF1AXlH3prVntMiIHOqqdVkmnOrzHy/mKtBkRxHd8TA9zJqAuqROQkAxI5HKZE1YZMiPM1HeIgE1RLPSeFb0KSlQ5gGt3aPaV4xwPieVXZKP8AmT9R99a9YsXQpG9YWsM3l7kXLu9Snc062vm8ogjTU6gRWPxPD1hxRLi8qtRsY8Jp1jhegmVde8QaaOidFOcm4Zukk6EVOXNKwT9qtKgWlqQOhPaH6Uew8PhILq0qnllykfMzQ3gzvS28hV5ys/i70A0UuHYFYTjjGOzaISe8dB686S5ZHSyD8I4gtkvOKuBmCFoKQcpQeyS7ooE6hS1p22y1im0Sgjp9Kro+lWrU6x1kVulg53W4quHlFRZI1q28molJ1jypkmiwG1DlstWuZtQKT55dv3jw8aOcIyp9SD+hS1nzIy+0gVQ4MUQy4ORKj5mUgeW1GuD2wH3j1bb91Sr+KyZoujUqqBdTrqFdIRCa6uNdQBohTqbSimIeKcKYKcKAHClFNBpwoAcKcKYDTpoAa+YHlrXk/HLEOrcGyiB7DevU7k7DrpXnvHTH5eboqD66j6UmXJ564qDpzinNJ+dRH4qu27ckAfcTWiEMYT3wKs37QKFeX0qJxORwTyBpl5c9KAfQIYeUhaVJMKSQQa9i4cxQLSAdCBqK8aCZOnWvQ8LbVlCkGFCp1fA9DyekMtBehqYYL/SSPWgGC4wNnO6fkfKtda3ySN6iUjZul0VUYcEaxrTXNKtXd6kAkkVlsVxqZDQk/wBXL+9TWAWX2LjWIBAjcnYV5xxqs5UTuVEn2rVsslRKlmSedZzjW3lKSP0kfPSnD9Qai9LMmgQBU7A7w8xSuN1KyzHeP39zW7OZIbdog1CpEjNy0HtpVy8TppUWWG4PMx67z+1DA0HC5PZlCf190eGYkT6T8q1HDDMLeUNswA9B/eg3CbIShKj+lKlH0k1qsEYyNAxBV3j/AKtayfZXgtrqFdSqqFdAiI11ca6gDQinCmA04GmIfSg0wGnUAPBpZpk0oNADwadTAaWgBrw+VYvjxn8pfQwoenL2/atqKEcRWIdZUg+flHOkypPEW0940dwxjmeQP7TQ9dmpK9QQQat4jeZEZRoTofarTG+ytiziVhS07pInyPP9qCOqJp6bkgnnIg+IqII6VSIb9hbVPeFencMNSgTXnmE2hWuK9b4dssiADWOszbQXGRLrDZGlQWrK06ZiPWtShiRUBtNayRrkGi1Kvik+etMetI5UeQxpUF2z3TQwTM2Vges/LeguOQUKJ2ANU77EVJddaJhQOZHnqY9dfegt9xDnaUhQhR0NXMvIqtJckLSkjvL5DbqTVZ+7zGPXy8PvrVBdwVGmhVdGDl3IOJWmKelgrUlCevzVQdp7UTtWv4WZQtSnCoQNEiYJJ5gb0nwPsOW1nP5Te3d7Q7DINcnmo6eU1pm1SJiPDp4VDY2oaTGxOp+g8f8AepQNSdqzGNWahVUqqiVQIiNdXE11AB8GnVEDTwaAHinVGDTppgPFOFRg04GgB80tMBpQaBDiYqJ9sEd7amP3zTc51pEdSJ9qzfEPFWVH5KM06ZlaDzjp508ZGgXxSllKlEqAnvAjcKjYivOb65zkmjeLFT0rKwoxyiB4a1n2GFLUEjmY2qpnA6K+SlaBzQN/Cil/g62kZ9Y0+daJWArsWWnCWXHHoUgCVKKSmZCY2G0+NazDroypqXyRcM26WFJXcHKVaCZjxk8q9TsGQUgp1BrKLwj8Tbo7VORyJ03SfLx6USwtx62aaZaZSs5u87nKU5J1zIMkKjaNNKzvRmlw+TdXU8Y4/vZpmkRUymaqs4k0pWTOkL/ozDN7UTBBFc23BeSoURVW/SchjpRNaaruIG1DQ0zwfioy7m2O3TUVn3CTuZr3HG+GWHgSoDN1rAL4UbdWpDKknL8RzSEz5b7Gtor8DPUnJissVIhGYwK3/wDwK0kJBUpUmCTp7UxjgtKHPzApxk7hBCXB0OuhjoK2nD8mVRU+DJ22FLIJOmhPUmOVFMDaLpgxDaRAAhR15Ec99602BYdDalOhSUhSsmeAsNjYr8ap4tijTaAq2La1FWvJQjUedUpfMpZHwkqbwWbd+8ZMsLDzZ1yLOon+lW8VprO/S4IIyq5pJn2POsNiTLxcbdt8ykEBaUg6CdSPKiLTTxk3ASM0ABM6evWoqFhMa5bWP4NeqoVVk0Xd2w6AVhTJ2KgVZfAxrHiKIWfE7K1FC5QR+opVkV4hRAj1ArJw8ZFnnAXNdXAg6jUGkqRhsGnA1EDTwaQEgNOBqMGnA0wJAadNRA0qlwJPKmBIVAamqGIYglKFKUsIAHxHYffShxcWVlSzJOiEJ2Sn6k8zUicMDigt8JUU/CndKfHX4leNWkl2Up4BCsMSezUstOEA5VpSQtZXBzLVmOY6VRuOHHn1kF7KiNgnWOhM1pcVYJaXl0UEnLGkECRFD+DcSW+wouaqCozREjKCJjnrWuaebDErEGXZwFTLjrBUFiMwKTr5KHKjPDlikoUjs1IKMuqhGaSe8nwqk9ZusPqADjtyrvpWn/lwVahYPUAz00rX5VJhO6i2qB46ED3o1Jx8hpvPHsUVWjBQSpSC3qFEkZdNwasYXh7KIW2JlICVElRCANEpKvhTHIVnEWbVwwxaW6VBaVB26dUCIUUwUa7mTt/lrQXmKsWYbaUTqAlKQJISNJPhVXpufTLz+BMam71UsY8kmNXS2EdohrtAD3gDBA6xBmh3DWKKuFPqJhsKTkBju93UT970fuXghClnZKSo+gmsepZxFsMWTRQrOFLBGVEZVHvLSIEkDfcxS053TjHyPVrY85+CbiThpby+3YICjGZB07w0zA9dqfwsu+bWpLy15AnQKWFiZG2pO01Z4OvVutKDupbVkk76Ab9SNprL4nbLaeddfd7J05lthMnNBGXUbJO0GtFuedOvBk9qxqSuzXY/it8jJ+GGeT3tJI6cxofpRG0fdUhJd7qyO8kKkA+dV7R/O2lf9SQrpuAedZK+4xc0S22ULSvUKgyB+kjcEmKxnTd+lLo2q5h7m+zRxc2zjy7QBfbpCe+vRpQJ/MAMzoduXjUeBYOm2Sdcy1fGrlpyHhqaLk6UIevXDchptsrSlsuOkCco1yn/ALTpzmmru1tQOIh72DuNrZSktrkhttXfjcBRAzDy196SyxtTl0ltpWdko3ykFJAMyfMD/wDVEcHxZF0lakpICVZe9GsgGYHnUt9dIt2ytQhKYHdHUwNPM0bsLY1z/IbU3vT4/gtTWbxDhZpSipKlIk7CCNeg5VBi2IuvKQqyKlJQhTiwkfCEkSVg8gCPeieE3puWg4rQwQY6gkSP3p7b01uTFujUblrooW9uvsAi3cGZlZRJgggH4T7j2qTFH3UMpKwkvEhCUpkhS1GEgTFR8OWvYl9qSSFBWY6TmSNR7fvV7FbYuITlJStJCkKGmVY2NTlbsPopJ7crsEY4Llh1m3UW+1WhK1hOuWVERqNBAmfGr95aApJioLPDex70l10glS1GSogaCTsJiq2GP3KlH8TCU6QCEiTJ0Eb7fKnWH9nwTG5fa7f6DhbuAAdo4IEQFqAH2ZrqIkV1RuZX059jWg08GoQacDWBJMDTgaiBpwNAiUGh2JXgGniB5qJAA9yBTcavlNtw0Mzq+62OUx8SuiRv7VgcVw2/BCVZ3AIyqQSRIGh6zImTW+jp7ny8Cq3PKWT0G1twmVHVREE+HQeFC7jCrhy6S922VtOXuJKgTEkgjYyflVoXam7cOPA5kN5ljSZA8CRNM4axoXSFqy5SlUETOhEgzHn7VUqkm1+RpW2mpf5juJMU/Cs5wkKUVBIB21kmY8Aa7h9DQYSpn4VlS/Un6aD0pOK8N/EW6kD4h3k/9QB09QSPWocKxAPrUpsZUFporTsEP98OJA6mAfUdapSnp5XyS6a1cPrwWeJMV/DslaQCqQkA9TzPhoaissWDjbFwsZM2ZJ3gHb2kVl+M2iLlClA5FpQmQYmFGRPUSK1d4wpu3CbY5Ft5ezOmhHWQQQec9abiVM/iJXTqsePBYQUBS1NjdXeMEEqAA1nwAFOfwxl1YccbClCIJkxGu21ZXBnr4vkvBwpWSpwrAAkj4hp4bCi/EjT67ebdaklBzKCSQVJjYEcxvFJxtvCfyNXujLn4DqgCCCJB0Pkazlrgr1o4XbB/ITu2sZkEbwfD5+NR2ePODDy+qCtJyAnZRzBIUff5VTveInmrVorTD7oJBUmBknRYGxkRHrVRGpL9PvgnUvSper2yaPBbEMN5NCoqK1ECAVKMmByA2HgBXXyrcOI7Xs+0g5M8TGkwTtUeCXKnGGlrnMpIJ0iT1jx3oTxzhvaNh5O7c5h1Qdz6RPqazlbtTFM0p7dPMo0CutDMTYt0/nvJTLeuYjXeBtvrEb0NxUPsWlkm1eC1PoCogdoJAMAagIExJ10otidj27CmlGCpI15ZhBnykU3GxrLFOotRPCKt9xI02ppPxdrBkbJSogBR5ny8KfiSblKibRSUlxJbdKo+ETlIkSCMytutZ/A+GXEPBdxADZlIBCsxB0PgnnRbirEHGEtrb+HP3/EDUDwmDV4U2lHZDbqG9RcCsBnDmUpWr4jBUATmVGpgcgBVu4abumSmcyFjQj3BHiDVHiKw7dCHAe63LhRsVDKDA6K0j1qtw3dhLL7gbKGgorQCZHw94JJ5SPn4VOMrdnktPFbGuMFjC2ryyQttlbLjS5lLiVAjMIMFJnURInlVrDrQMMpbHIb9TuT70B/4pUplS1IAWFZUgTl1E6k9BuPLaaJ8PXjjzOd3fMoAwACJ5Aeo9Keora9ROl9NV6Dg/wD/ACsiSCC2c3gQUx6946VSxPE0IDyHHlJUkKDbaGyFFRAKCXTKcmqpiDppVayaW3iDuYGFgqB5ESCNeu9GMTw5q4H5gkp5gwR1GlTO2a55Q6VXPHDyUcNxlDqVLggpgFO51IAgDUiSKpcSWLzjSngBlYUCo5oPegAgeB/fTnBKxYYbCm2ssiCoTKt9M1Z2yuVXbim3Scnx5AYSSkgQofq3O9VCSp0ukTqZcqW+WaZlUpBPMA+4murgeldWB0GpBpwNQhVOBrIxJgqnBVQg04GgAHjuPot3UJUkqKuYIGVMxOvjPtTsR4kaZdSzqtSiAYiEZiIzH1mKF8UYYpbyH0tdslPdW3JBUASd0kGNTt4b0ZxGyau32bgMllDbYHZqCQSoGUylMwBruddNBz7ZnT2JsjdqbtqRdxBoOIU0dM6VJ8pB1oIqwVZW4Ztszj76wgEDUnKSconSADHnNdb3wXevqV3UW7QSSdpUrMT7J+VEFXKX0NXFu5lLTmdKyknVMpUkpJBggketTOZ76LrFZx3zgGt4t+CaDN0pargKOZE9otIJkSQSIywd9jVvD8XTeJfQ0FIUE5QZE94KAVpsZobiTb7Oe+ch991WWVIIDaCkgQgeAA1O0dTUnC+LdstKUshsIbUFFOiJKkxCY02PWtKlNOl/fgziqTUV/r/oQ4ZxJb6VNutEdlCcx1BUkQQZHxCJqvxdibjCEdn+pRzaAyAJy+v0qxj+Pi0ygN5iuTvlAAIknx1p1y2xeBTRM5cpkboUoEgg9Y5e9Zr7Strg0bzLhP1FV7iiHGmeyVC8kqUCk9/YpSRqPHwNOXxEGroW60gJMDOVRBUJGkbct6tMWYU6327qXXLdJSgwA4UnUFzvEqI1g6bk60FxXhtb92VqUA2oCT+oQIygeO/qarGlnHjBOdXbnzk0V9YB5lbPwzEEAaEHMDHnVfELNy8LS8QKD2SSkIbBSgkn4lEmZMJ0EDSqXGDzrTSVMqKcq0yU6aQQJ6iY0rM4zirt84hDYI0ACJ0K91KPgOvICnpTbnh8fsLVqFXKyzaY+4lDOZefs0qSVhtWRZRIBCVcjqPaKq4Zjlu64WGe1LfZjKXoKlECFhRkzyPqrlFEb+17VlTajqpBST4kb++tZ3hjh5xhwuulM5SkJEneJJPpUS5+m0+/Bdzf1E115NFa2TTP/KQlHWBHuaqYdjjD4WUK0b1UVApGX+rXlofaiE1juG2GLS6Ui+acWkgpRCS42oE6Z0JErmNuXMcwtOFecvkerb08YXAXwvHUXSlpQkjJBBP6gZ1jlt86lVdW9wV25UFkaKTqPhPI84PSqljhn4cPraSZWpakJVAISJKEGNAdeXXwrN4Esm6b7JC0q1DwPeiSc24lI231mq+nLbc+CfqUlKrybt99DaSpZCUpjU7DlUIcbfaOUhSFgp02g6Gg3Fli66Wy2FLQNFtpVlnWQfPcTyonZ2aLdrI3IGp1MmTvJ+9qzaSlPPJqm3TWOAdaYe4Wk2jykFhtedIQkoWsyo/mGYI73noNdKZj98bYMlsQ2FEFIgAjLoPDmfSqhx5gOOJWt5KcqQlxrIrKsKJUcqtFAiBvy9aLW4S+wntBnSoZu+BO8iQNJ22rStyxV9GM7XmY4fuDbDElvlDi28gzEJIMhQg9ao8OW5F4tlbyWc+YFSplUyQUSMubmMx99qscR4sWnW20JkgZvMqlKQB50VubVtxMuoSvKOYB8wKJrb2uGOpd8J8oEYXhRYuHxmzJQotpUDIXrmmeZGgPQkjlVy2sG2iooTBUZOs+ngPCm4RiiXwciCgIgAabEaQBttQdziNebutjJny5tTOugEbGNedKldUwlxEos4nevNuFLbRUnQzCjJO+21dRYqrqlUvYpxX+RowunBVVQunBdcwi2FU5KqqhdOC6AI0HIggakAx4n/esxh2L3qHWxcjuukiFBKSIEmI1HrUfGNgpWV4EQgZYMyDMyPsbVXtbR68LLr7gyhUABMKhJkyepiu2JSjL8kXVOsLPAT4mai2W6BBWtBX1KEyEz6kVX4edcRbF50fktEqQgaFwlXxKJ/SCdBzo5il0EpUCDlCFLVG5SkSQPExFS3Fui5tsiZQlaU5YA7sQU6bRoNKmb9O1rjJdafq3J84L+HYgh9tLiJyqnfQggwQfUUO4mvg2woSoKclCCnkopJGo1G3LrQmxt3bO0uZUMwJKSkkgSlInUDXWfSprO3N5ZNdoshaSVBcSZQpSRPXTSjak93jIt7a2+cAe3advbWE99xlcCTqpCkzEncgxvyFGcFZNlaqW6nvarUkETA0Anbb96OtEACAB5ab70IwvEvxQdC0CErWiNwpM6SOsb061HSfHGQnSUtc8gK+dt7oO3OdTTqU6NlSe8UgAFJ3M7aa6VpcDve1ZbX3pjKc25KdCZ5zFRJ4ZtQvN2f8ApklGv+U1WuccQ1cptg3Ce6kFMAAq1Ay/0xH8U7pWsT4FEuHmvP6hBzEG3nHbYiShInopKgMw8xmHvUuE4QyxJaTqeZOYx0BOwqujCW+2/ECQspII/SZESR1gVct3eVZOuMSaqec12AhxWRcqacSA3nKArUKBmAVSYj+RVnjQr/DEoJEKTmjTumR7SRU97gTDroeWk5tCYMBUbSPb61duEJWkoWAUq0IPMVTuU00vzEotzSp/kY7BuJXEIaYQ3nXOWSTsVaaDXQc/CthfPKS2tSBKglRA3kgEgQKG4XgbNsorRmKiIlRBgdBpQjjZbiezWhakp1BAURJ0IMDeqe3UvEkrfp6bdcjcJxC5D7YuVwHQSlJAGvLQCU+taW6eS0hbkfCkqMDU5RP0rPYHaqfyXNwsrUNECAAIMSQBqZk+1Gc6X2yIOVYUkjYxqk1Opjd+49LO39gdwtizr5dDmoBlJgCAonu6eEUSvngTkkZomJ1g6T/eo8JszbtBvNmgmDEaEzFCnbJZvA9mGXJljn5eU61NbXTwVO6ZSfLJWuGrcakKVz7yiR69aa/iikXYZPwKQIEbK1Mz00ipbnGAlxxrKczbRcnkYEx4biussjyWrhSR2mSAek7x8/eqy8ZonCziOCDGbALdZd/oOviNx7H96j4gu3Wm0qZ694wFQI5zsJp3Ez5Q1mG4Uj/zFX0r0qU8YbKazlIGYA+laMyEBCYAgAAFYJzERy1T7Vaas22wrImMxzHnr4Dl6Uy/u0sJnLpmCYTA1VzqPGbotNKWncQPfSfnQ8t8eRcTPPgsJNdWOOLunVSj/phI9orq0+gzH/0L2P/Z',
      editedComment: '',
      newComment: '',
    };
  },
  props: ['activities'],
  methods: {
    save() {
      this.$emit('add-comment', {
        id: this.newCommentId,
        text: this.newComment,
        name: 'ME',
        createdAt: moment().toISOString(),
        imgSrc: this.profileImg,
      });
      this.newComment = '';
    },
    toEdit(comment, index) {
      this.isEdit = index;
      this.editedComment = comment;
    },
    formatDate(date) {
      let created = moment(date);
      return created.format('MMMM Do ddd [at] HH:mm a');
    },
    edit(id) {
      this.$emit('edit-comment', { text: this.editedComment, id: id });
      this.isEdit = undefined;
    },
    deleteComment(id) {
      this.$emit('delete-comment', id);
    },
  },
  computed: {
    newCommentId() {
      return (
        this.activities.reduce((acc, cur) => {
          return Math.max(acc, cur.id);
        }, 0) + 1
      );
    },
    orderedActivities() {
      let clone = _.cloneDeep(this.activities);
      return clone.sort(
        (a, b) => moment(b.createdAt).unix() - moment(a.createdAt).unix()
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-module {
  .activity-header {
    position: relative;
    .ico {
      position: absolute;
    }
    .activity-title {
      padding-top: 2px;
    }
  }
  .activity-list-wrapper {
    .comment-text-field {
      max-width: calc(100% - 64px);
    }
  }
  .comment-container {
    max-width: calc(100% - 64px);
  }

  .date-text {
    font-size: 0.75rem;
    opacity: 0.8;
  }
  p {
    margin: 0;
  }
  .comment-input-wrapper {
    display: inline-block;
    background: #fff;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .activity-actions {
    button {
      font-size: 14px;
      text-decoration: underline;
    }
  }
}
</style>
