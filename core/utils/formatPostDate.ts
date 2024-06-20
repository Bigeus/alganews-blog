import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function formatPostDate(postCreationDate: string){
    
    const postDate = new Date();
    const today = new Date();
    
    const daydiff = differenceInDays(today, postDate)

    if(daydiff > 3){
        return format(postDate, 'dd/MM/yyyy');
    }

    return 'há ' + formatDistanceToNow(postDate, {locale: ptBR}); 
}