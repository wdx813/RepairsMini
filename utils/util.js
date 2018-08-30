const baseUrl = 'https://www.wgxy.org'

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const showToast = msg => {
    wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1500
    })
}

const formatRepairList = repairList => {
    if (repairList.length > 0) {
        for (let i = 0; i < repairList.length; i++) {
            let repair = repairList[i]
            // 格式化报修类型
            let repairTypeStr = ''
            switch (parseInt(repair.repairType)) {
                case 1:
                    repairTypeStr = '水电设施'
                    break
                case 2:
                    repairTypeStr = '环境设施'
                    break
                case 3:
                    repairTypeStr = '生活设施'
                    break
            }
            repair.repairTypeStr = repairTypeStr
            // 格式化图片
            if (repair.imgs && repair.imgs.length > 0) {
                repair.imgArray = repair.imgs.split(';')
            }
            //格式化状态
            let status = {}
            switch(repair.status) {
                case 1:
                    status = {str: '提交', style: 'status-selected-1'}
                    break
                case 2:
                    status = { str: '受理', style: 'status-selected-2' }
                    break
                case 3:
                    status = { str: '完成', style: 'status-selected-3' }
                    break
                case 4:
                    status = { str: '已评价', style: 'status-selected-4' }
                    break
                case 5:
                    status = { str: '强制结束', style: 'status-selected-5' }
                    break
            }
            repair.status = status
            // 格式化主题
            if(repair.pairtheme.length > 20) {
                repair.pairtheme = repair.pairtheme.substring(0, 20) + '...'
            }
            // 格式化内容
            if(repair.paorcontent.length > 20) {
                repair.paorcontent = repair.paorcontent.substring(0, 20) + '...'
            }
        }
    }
    return repairList
}


const formatRepairDetail = repair => {
    // 格式化报修类型
    let repairTypeStr = ''
    switch (parseInt(repair.repairType)) {
        case 1:
            repairTypeStr = '水电设施'
            break
        case 2:
            repairTypeStr = '环境设施'
            break
        case 3:
            repairTypeStr = '生活设施'
            break
    }
    repair.repairTypeStr = repairTypeStr
    //格式化状态
    let statusStr = ''
    switch (repair.status) {
        case 1:
            statusStr = '提交'
            break
        case 2:
            statusStr = '受理'
            break
        case 3:
            statusStr = '完成'
            break
        case 4:
            statusStr = '已评价'
            break
        case 5:
            statusStr = '强制结束'
            break
    }
    repair.statusStr = statusStr
    // 格式化图片
    if (repair.imgs && repair.imgs.length > 0) {
        let imgArray = []
        let tempArray = repair.imgs.split(';')
        for (let index in tempArray) {
            if (tempArray[index]) {
                let url = baseUrl + tempArray[index]
                imgArray.push(url)
            }
        }
        repair.imgArray = imgArray
    }

    // 格式化反馈图片
    if (repair.opinionimg && repair.opinionimg.length > 0) {
        let opinionImgArray = []
        let tempArray = repair.opinionimg.split(';')
        for (let index in tempArray) {
            if (tempArray[index]) {
                let url = baseUrl + tempArray[index]
                opinionImgArray.push(url)
            }
        }
        repair.opinionImgArray = opinionImgArray
    }
    return repair
}

module.exports = {
    formatTime: formatTime,
    showToast: showToast,
    formatRepairList: formatRepairList,
    formatRepairDetail: formatRepairDetail
}