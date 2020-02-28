
function createComponent(legend,content){
    Vue.component('group-box', {
        props:[component],
        template: `<fieldset className="well">
                    <legend className="well-legend text-uppercase">{{component.legend}}</legend>
                   {{component.content}}
                </fieldset>`
      });
}
