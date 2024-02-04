package V1

import (
	"github.com/gogf/gf/v2/frame/g"
	"shipmgr/internal/model"
)

type UnityReq struct {
	g.Meta `path:"/unity" tags:"Unity" method:"get" summary:"Get part in json"`
}

type UnityRes struct {
	Status bool `dc:"Status code"`
	Data   []model.PartOutput
}
