package V1

import (
	"github.com/gogf/gf/v2/frame/g"
	"shipmgr/internal/model"
)

type GltfImportReq struct {
	g.Meta `path:"/part/gltf" tags:"Add" method:"post" summary:"Parse gltf file to parts"`
	Nodes  []model.GltfNode
}

type GltfImportRes struct {
	Status bool `dc:"Status code"`
}
