import Dialog from 'qnui/lib/dialog';
import Button from 'qnui/lib/button';
import Input1 from './Dialog/Input'
class Dialog1 extends React.Component{
  state = {
     footerAlign: 'right',
     visible: false
  };
  render(){
    return (
        <div className=''>
          <Button onClick={this.onOpen} type='primary'>创建活动</Button>
          <Dialog visible = {this.state.visible}
                  onOk = {this.onClose}
                  onCancel = {this.onClose}
                  onClose = {this.onClose}
                  title = '添加抽奖模块'
                  footerAlign = 'right'
                  >
            <div><Input1/></div>
            <ul>
              <li>批量粘贴(买家昵称,多个用','隔开或者每行一个)</li>
            </ul>
          </Dialog>
      </div>
      )
  }
  onClose = () => {
    this.setState({
      visible: false
    })
  }
  onOpen = () => {
    this.setState({
        visible: true
    })
  }
}

export default Dialog1;