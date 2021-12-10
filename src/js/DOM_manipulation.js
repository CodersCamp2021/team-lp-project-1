export default class DomManipulation{
    getElement(elem_id){
        let elem = document.getElementById(elem_id);
        let elem_value = elem.innerText
        return [elem, elem_value]
    }
}