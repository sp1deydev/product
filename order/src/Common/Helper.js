class Helper {
    static convertToVnd = function (number) {
        return number = number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    }
}
export default Helper