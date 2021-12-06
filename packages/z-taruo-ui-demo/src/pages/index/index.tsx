import React from 'react'
import { Image, Text, View } from '@tarojs/components'
import Taro, { ShareAppMessageReturn } from '@tarojs/taro'
import iconBasic from '../../assets/images/icon-list-basic.png'
import logoImg from '../../assets/images/logo_taro.png'
import './index.scss'

interface IndexState {
  list: {
    id: string
    title: string
    content: string
    icon: string
    subpages?: any
  }[]
}

export default class Index extends React.Component<{}, IndexState> {
  public config: Taro.PageConfig = {
    navigationBarTitleText: '小程序组件 UI'
  }

  public constructor(props: any) {
    super(props)

    this.state = {
      list: [
        {
          id: 'Basic',
          title: '基础0000',
          content: '包含颜色、文本、图标等',
          icon: iconBasic
        }
      ]
    }
  }

  public onShareAppMessage(): ShareAppMessageReturn {
    return {
      title: 'z-taruo-ui',
      path: '/pages/index/index',
      imageUrl: 'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg'
    }
  }

  private gotoPanel(id: string): void {
    Taro.navigateTo({
      url: `/pages/panel/index?id=${id.toLowerCase()}`
    })
  }

  public render(): JSX.Element {
    const { list } = this.state

    return (
      <View className='page page-index'>
        <View className='logo'>
          <Image
            src='https://pic.qqtn.com/up/2019-9/15690311636958128.jpg'
            className='img'
            mode='widthFix'
          />
        </View>
        <View className='page-title'>z-taruo-ui</View>
        <View className='module-list'>
          {list.map((item, index) => (
            <View
              className='module-list__item'
              key={index}
              data-id={item.id}
              data-name={item.title}
              data-list={item.subpages}
              onClick={this.gotoPanel.bind(this, item.id)}
            >
              <View className='module-list__icon'>
                <Image src={item.icon} className='img' mode='widthFix' />
              </View>
              <View className='module-list__info'>
                <View className='title'>{item.title}</View>
                <View className='content'>{item.content}</View>
              </View>
              <View className='module-list__arrow'>
                <Text className='at-icon at-icon-chevron-right' />
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
