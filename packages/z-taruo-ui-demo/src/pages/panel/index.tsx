import React from 'react'
import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import iconAction from '../../assets/images/icon-list-action.png'
import iconBasic from '../../assets/images/icon-list-basic.png'
import iconForm from '../../assets/images/icon-list-form.png'
import iconHOC from '../../assets/images/icon-list-hoc.png'
import iconLayout from '../../assets/images/icon-list-layout.png'
import iconNavigation from '../../assets/images/icon-list-navigation.png'
import iconView from '../../assets/images/icon-list-view.png'
import './index.scss'

interface PanelBasicState {
  panelNames: {
    [key: string]: {
      name: string
      icon: string
    }
  }
  list: {
    [key: string]: {
      id: string
      name: string
    }[]
  }
  currentId: string
}

export default class PanelBasic extends React.Component<{}, PanelBasicState> {
  public config: Taro.PageConfig = {
    navigationBarTitleText: 'z-taruo-ui'
  }

  public constructor(props: any) {
    super(props)

    this.state = {
      panelNames: {
        basic: {
          name: '基础',
          icon: iconBasic
        }
      },
      list: {
        basic: [
          {
            id: 'Button',
            name: '按钮'
          }
        ]
      },
      currentId: ''
    }
  }

  public componentDidMount(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { id } = Taro.Current.router.params
    this.setState({
      currentId: id.toLowerCase() || ''
    })
  }

  private gotoComponent(id: string, parent: string): void {
    Taro.navigateTo({
      url: `/pages/${parent.toLowerCase()}/${id.toLowerCase()}/index`
    })
  }

  public render(): JSX.Element {
    const { list, currentId, panelNames } = this.state
    const itemList = list[currentId] || []
    const title = (panelNames[currentId] && panelNames[currentId].name) || ''
    const icon = (panelNames[currentId] && panelNames[currentId].icon) || ''

    return (
      <View className='page'>
        {/* S Header */}
        <View className='panel-header'>
          <View className='panel-header__icon'>
            {icon ? (
              <Image src={icon} className='img' mode='widthFix' />
            ) : (
              <Text className='at-icon at-icon-list' />
            )}
          </View>
          <View className='panel-header__title'>{title}</View>
        </View>
        {/* E Header */}

        {/* S Body */}
        <View className='panel-body'>
          <View className='component-list'>
            {itemList.map(item => (
              <View
                className='component-list__item'
                key={item.id}
                onClick={this.gotoComponent.bind(this, item.id, currentId)}
              >
                <Text className='name'>{`${item.id} ${item.name}`}</Text>
                <Text className='at-icon at-icon-chevron-right' />
              </View>
            ))}
          </View>
        </View>
        {/* E Body */}
      </View>
    )
  }
}
