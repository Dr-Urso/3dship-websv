// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package part

import (
	"context"

	"shipmgr/api/part/V1"
)

type IPartV1 interface {
	GltfImport(ctx context.Context, req *V1.GltfImportReq) (res *V1.GltfImportRes, err error)
	AddGroup(ctx context.Context, req *V1.AddGroupReq) (res *V1.AddGroupRes, err error)
	Add(ctx context.Context, req *V1.AddReq) (res *V1.AddRes, err error)
	Filter(ctx context.Context, req *V1.FilterReq) (res *V1.FilterRes, err error)
	Unity(ctx context.Context, req *V1.UnityReq) (res *V1.UnityRes, err error)
	Update(ctx context.Context, req *V1.UpdateReq) (res *V1.UpdateRes, err error)
}
