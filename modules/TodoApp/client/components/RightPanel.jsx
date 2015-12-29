import { Component } from 'react';

export default class RightPanel extends Component {

  componentDidMount(){
    // When migrating libraries. Dom manipulations in the sense of adding or changing
    // attributes is okay. As long react controlled nodes are not removed
    $('input[name="color-radio"]').on('change', function () {
      if (this.checked) {
        $('.view').removeClass('theme-pink theme-blue theme-red theme-black theme-gray theme-orange theme-yellow theme-lightblue theme-green');
        $('.view').addClass('theme-' + $(this).val());
      }
    });
    $('input[name="layout-radio"]').on('change', function () {
      if (this.checked) {
        $('.view').removeClass('layout-dark layout-white');
        $('.view').addClass(this.value);
      }
    });

  }

  render() {
    return (
      <div className="panel panel-right panel-cover layout-dark">
        <div className="content-block-title">Choose Color Theme</div>
        <div className="list-block">
          <ul>
            <li>
              <label className="label-radio item-content">
                <input type="radio" name="color-radio" defaultValue="blue" defaultChecked />
                <div className="item-inner">
                  <div className="item-title">Blue</div>
                </div>
              </label>
            </li>
            <li>
              <label className="label-radio item-content">
                <input type="radio" name="color-radio" defaultValue="gray" />
                <div className="item-inner">
                  <div className="item-title">Gray</div>
                </div>
              </label>
            </li>
            <li>
              <label className="label-radio item-content">
                <input type="radio" name="color-radio" defaultValue="black" />
                <div className="item-inner">
                  <div className="item-title">Black</div>
                </div>
              </label>
            </li>
            <li>
              <label className="label-radio item-content">
                <input type="radio" name="color-radio" defaultValue="lightblue" />
                <div className="item-inner">
                  <div className="item-title">Light Blue</div>
                </div>
              </label>
            </li>
            <li>
              <label className="label-radio item-content">
                <input type="radio" name="color-radio" defaultValue="yellow" />
                <div className="item-inner">
                  <div className="item-title">Yellow</div>
                </div>
              </label>
            </li>
            <li>
              <label className="label-radio item-content">
                <input type="radio" name="color-radio" defaultValue="orange" />
                <div className="item-inner">
                  <div className="item-title">Orange</div>
                </div>
              </label>
            </li>
            <li>
              <label className="label-radio item-content">
                <input type="radio" name="color-radio" defaultValue="pink" />
                <div className="item-inner">
                  <div className="item-title">Pink</div>
                </div>
              </label>
            </li>
            <li>
              <label className="label-radio item-content">
                <input type="radio" name="color-radio" defaultValue="green" />
                <div className="item-inner">
                  <div className="item-title">Green</div>
                </div>
              </label>
            </li>
            <li>
              <label className="label-radio item-content">
                <input type="radio" name="color-radio" defaultValue="red" />
                <div className="item-inner">
                  <div className="item-title">Red</div>
                </div>
              </label>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Choose Layout Theme</div>
        <div className="list-block">
          <ul>
            <li>
              <label className="label-radio item-content">
                <input type="radio" name="layout-radio" defaultValue defaultChecked />
                <div className="item-inner">
                  <div className="item-title">Default</div>
                </div>
              </label>
            </li>
            <li>
              <label className="label-radio item-content">
                <input type="radio" name="layout-radio" defaultValue="layout-dark" />
                <div className="item-inner">
                  <div className="item-title">Dark</div>
                </div>
              </label>
            </li>
            <li>
              <label className="label-radio item-content">
                <input type="radio" name="layout-radio" defaultValue="layout-white" />
                <div className="item-inner">
                  <div className="item-title">White</div>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}