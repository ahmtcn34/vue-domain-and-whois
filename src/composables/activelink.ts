
 interface IUseActiveLink  { 
    width: number;
    height: number;
    top: number;
    left: number;
    style: string;
};
export function useActiveLink(el: HTMLElement): IUseActiveLink {
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const top = el.offsetTop;
    const left = el.offsetLeft;
    const style = `width:${width}px;height:${height}px;top:${top}px;left:${left}px`;
    return { width,height,top,left,style };
}